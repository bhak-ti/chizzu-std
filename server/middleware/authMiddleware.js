const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Format: Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Inject user info ke req
    next(); // Lanjut ke route berikutnya
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
