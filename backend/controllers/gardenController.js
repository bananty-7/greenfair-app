const mongoose = require("mongoose");
const SavedPlant = require("../models/SavedPlant");
const plantsDatabase = require("../data/plantsDatabase");
const { success, error } = require("../utils/response");

function dbReady() {
  return mongoose.connection.readyState === 1;
}

async function addToGarden(req, res) {
  if (!dbReady()) {
    return error(res, "MongoDB not connected. Set MONGO_URI in .env to enable 'My Garden'.", 503);
  }
  try {
    const { userId, plantId, nickname, photoUrl } = req.body;
    if (!userId || !plantId) return error(res, "userId and plantId are required", 400);

    const exists = plantsDatabase.find((p) => p.id === plantId);
    if (!exists) return error(res, "Unknown plantId", 404);

    const saved = await SavedPlant.create({ userId, plantId, nickname, photoUrl });
    return success(res, saved, "Plant added to your garden", 201);
  } catch (err) {
    return error(res, "Failed to add plant", 500, err.message);
  }
}

async function listGarden(req, res) {
  if (!dbReady()) {
    return error(res, "MongoDB not connected. Set MONGO_URI in .env to enable 'My Garden'.", 503);
  }
  try {
    const { userId } = req.params;
    const items = await SavedPlant.find({ userId }).sort({ createdAt: -1 });

    const enriched = items.map((item) => ({
      ...item.toObject(),
      species: plantsDatabase.find((p) => p.id === item.plantId) || null,
    }));

    return success(res, enriched, `${items.length} saved plant(s)`);
  } catch (err) {
    return error(res, "Failed to fetch garden", 500, err.message);
  }
}

async function updateGardenPlant(req, res) {
  if (!dbReady()) {
    return error(res, "MongoDB not connected. Set MONGO_URI in .env to enable 'My Garden'.", 503);
  }
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await SavedPlant.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return error(res, "Saved plant not found", 404);
    return success(res, updated, "Updated");
  } catch (err) {
    return error(res, "Failed to update", 500, err.message);
  }
}

async function removeFromGarden(req, res) {
  if (!dbReady()) {
    return error(res, "MongoDB not connected. Set MONGO_URI in .env to enable 'My Garden'.", 503);
  }
  try {
    const { id } = req.params;
    await SavedPlant.findByIdAndDelete(id);
    return success(res, null, "Removed from garden");
  } catch (err) {
    return error(res, "Failed to remove", 500, err.message);
  }
}

module.exports = { addToGarden, listGarden, updateGardenPlant, removeFromGarden };
