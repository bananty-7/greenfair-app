const mongoose = require("mongoose");

/**
 * Represents a plant a user has added to "My Garden" — tracks
 * personalised reminders (last watered, next pruning date) on top of
 * the static species data in data/plantsDatabase.js.
 */
const savedPlantSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true }, // simple string id for now (no auth wired yet)
    plantId: { type: String, required: true }, // references id in plantsDatabase.js
    nickname: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    lastWateredAt: { type: Date, default: null },
    lastPrunedAt: { type: Date, default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.SavedPlant || mongoose.model("SavedPlant", savedPlantSchema);
