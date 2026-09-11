const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  identify,
  getAllPlants,
  getPlantById,
  diagnose,
  weatherCheck,
} = require("../controllers/plantController");

// Camera/photo based identification
router.post("/identify", upload.single("image"), identify);

// Browse full plant database (supports ?category= and ?search=)
router.get("/", getAllPlants);

// Symptom-based daily diagnosis
router.post("/diagnose", diagnose);

// Single plant detail
router.get("/:id", getPlantById);

// Weather suitability for a specific plant at a location
router.get("/:id/weather-check", weatherCheck);

module.exports = router;
