const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

// Login route
router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Received login attempt for:", username); // <- log disini
  
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
      res.json({ message: "Login successful", user });
    } catch (err) {
      console.error("❌ Error during login:", err); // <- ini penting
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
