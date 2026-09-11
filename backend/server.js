require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDB = require("./config/db");
const plantRoutes = require("./routes/plantRoutes");
const gardenRoutes = require("./routes/gardenRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// Serve uploaded images statically (useful for debugging in demo mode)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
app.get("/", (req, res) => {
  res.json({
    name: "GreenFair API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      identify: "POST /api/plants/identify (multipart image upload)",
      listPlants: "GET /api/plants?category=&search=",
      plantDetail: "GET /api/plants/:id",
      diagnose: "POST /api/plants/diagnose { symptoms: [] }",
      weatherCheck: "GET /api/plants/:id/weather-check?lat=&lon=",
      garden: "GET|POST /api/garden, PATCH|DELETE /api/garden/:id",
    },
  });
});

app.use("/api/plants", plantRoutes);
app.use("/api/garden", gardenRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// --- Start server ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌱 GreenFair backend running on http://localhost:${PORT}`);
  });
});

module.exports = app;
