// server.js - Updated with proper port handling
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // Use port 8080 as specified

app.use(express.json());

// Health check endpoint - required for Railway deployments
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.essential
  });
});

// API endpoints
app.post("/activation/activate", (req, res) => {
  const { code, userId } = req.body;
  res.json({
    success: true,
    message: "Activation successful",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
