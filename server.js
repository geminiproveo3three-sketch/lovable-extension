// server.js (complete implementation)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');

// Health check endpoint (required)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.env.UPTIME || process.uptime()
  });
});

// Activation endpoint
app.post("/activation/activate", (req, res) => {
  const { licenseKey, email } = req.body;
  
  // Simulate activation validation
  if (!licenseKey || !email) {
    return res.status(400).json({
      ok: false,
      error: "License key and email required"
    });
  }

  // Simulate successful activation
  res.status(200).json({
    ok: true,
    message: "Activation successful",
    session_id: Math.random().toString(36).substring(2, 15),
    license_key: licenseKey,
    user_name: "User",
    email: email
  });
});

// License validation endpoint
app.post("/api/v1/licenses/validate", (req, res) => {
  const { key, email } = req.body;
  
  // Simulate license validation
  if (!key) {
    return res.status(400).json({
      ok: false,
      error: "License key required"
    });
  }

  // Simulate successful validation
  res.status(200).json({
    ok: true,
    license_id: "lic_" + Math.random().toString(36).substring(2, 15),
    session_id: Math.random().toString(36).substring(2, 15),
    license: {
      bound_email: email || "user@example.com",
      plan: "premium",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active"
    },
    config: {
      brandName: "Lovable",
      brandText: "Lovable",
      logoUrl: "",
      socialLinks: {}
    }
  });
});

// AI prompt enhancement endpoint
app.post("/api/v1/ai/improve-prompt", (req, res) => {
  const { prompt } = req.body;
  
  // Simulate AI improvement
  res.status(200).json({
    ok: true,
    optimized_prompt: `Improved: ${prompt}`,
    text: `Improved: ${prompt}`
  });
});

// Chat endpoint
app.post("/api/v1/lovable/chat", (req, res) => {
  const { message } = req.body;
  
  // Simulate chat response
  res.status(200).json({
    ok: true,
    message: "Chat response generated",
    content: `Response to: ${message}`,
    timestamp: new Date().toISOString()
  });
});

// Media upload endpoint
app.post("/api/v1/media/upload", (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({
      ok: false,
      error: "No file provided"
    });
  }

  // Simulate successful upload
  res.status(200).json({
    ok: true,
    id: Math.random().toString(36).substring(2, 15),
    public_url: `https://yourdomain.com/uploads/${file.originalname}`,
    file_name: file.originalname,
    size: file.size
  });
});

// Serve admin interface
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin/index.html");
});

// Error handler middleware (should be used after all routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
