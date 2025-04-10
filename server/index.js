const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db/pool");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Chizzu.std Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test DB connection
pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL database!");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  });
