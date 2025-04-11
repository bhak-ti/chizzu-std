const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login attempt for:", username);

    const userQuery = await pool.query(
      "SELECT * FROM userdat WHERE username = $1",
      [username]
    );
    if (userQuery.rows.length === 0) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userQuery.rows[0];
    console.log("🔐 Checking password...");

    const isMatch = await bcrypt.compare(password, user.userpwd);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login success");

    // Remove sensitive info
    const { userpwd, ...userWithoutPwd } = user;

    // Generate JWT
    const token = jwt.sign(
      { userid: user.userid, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPwd
    });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
