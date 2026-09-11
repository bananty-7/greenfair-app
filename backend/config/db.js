const mongoose = require("mongoose");

/**
 * Connects to MongoDB if MONGO_URI is provided.
 * The app is fully functional without MongoDB (using the local JSON
 * database in /data), but connecting enables the "My Garden" (saved
 * user plants) and user account features to persist.
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log("ℹ️  MONGO_URI not set — running with local JSON plant database only.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("⚠️  MongoDB connection failed, continuing with local JSON database:", err.message);
  }
}

module.exports = connectDB;
