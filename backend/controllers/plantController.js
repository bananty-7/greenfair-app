const fs = require("fs");
const plantsDatabase = require("../data/plantsDatabase");
const diseaseDatabase = require("../data/diseaseDatabase");
const { identifyPlantImage } = require("../services/identificationService");
const { checkWeatherSuitability } = require("../services/weatherService");
const { success, error } = require("../utils/response");

/**
 * POST /api/plants/identify
 * Accepts an uploaded image (multipart/form-data, field name "image")
 * and returns the identified species + full care details.
 */
async function identify(req, res) {
  try {
    if (!req.file) {
      return error(res, "No image uploaded. Attach an image under the 'image' field.", 400);
    }

    const result = await identifyPlantImage(req.file.path);

    // clean up uploaded file after processing (comment out to keep for debugging)
    fs.unlink(req.file.path, () => {});

    return success(res, result, "Plant identified successfully");
  } catch (err) {
    console.error(err);
    return error(res, "Failed to identify plant", 500, err.message);
  }
}

/** GET /api/plants — list all known plants (optionally filter by category) */
function getAllPlants(req, res) {
  const { category, search } = req.query;
  let results = plantsDatabase;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.bn.includes(q) ||
        p.scientificName.toLowerCase().includes(q)
    );
  }

  return success(res, results, `${results.length} plant(s) found`);
}

/** GET /api/plants/:id — full detail for a single plant */
function getPlantById(req, res) {
  const plant = plantsDatabase.find((p) => p.id === req.params.id);
  if (!plant) {
    return error(res, "Plant not found", 404);
  }
  return success(res, plant, "Plant detail fetched");
}

/**
 * POST /api/plants/diagnose
 * Body: { symptoms: ["yellow leaves", "sticky leaves"] }
 * Returns likely causes + remedies based on rule-based symptom matching.
 */
function diagnose(req, res) {
  const { symptoms } = req.body;
  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return error(res, "Provide a 'symptoms' array, e.g. ['yellow leaves']", 400);
  }

  const lowerSymptoms = symptoms.map((s) => s.toLowerCase());
  const matches = diseaseDatabase.filter((entry) =>
    entry.symptomKeywords.some((keyword) =>
      lowerSymptoms.some((s) => s.includes(keyword) || keyword.includes(s))
    )
  );

  if (matches.length === 0) {
    return success(
      res,
      { matches: [] },
      "No exact match found — try describing symptoms differently (e.g. 'yellow leaves', 'white powder', 'wilting')."
    );
  }

  return success(res, { matches }, "Diagnosis complete");
}

/**
 * GET /api/plants/:id/weather-check?lat=..&lon=..
 * Checks if the current local weather suits this plant.
 */
async function weatherCheck(req, res) {
  try {
    const plant = plantsDatabase.find((p) => p.id === req.params.id);
    if (!plant) return error(res, "Plant not found", 404);

    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return error(res, "Provide 'lat' and 'lon' query params", 400);
    }

    const result = await checkWeatherSuitability(parseFloat(lat), parseFloat(lon), plant);
    return success(res, result, "Weather suitability checked");
  } catch (err) {
    console.error(err);
    return error(res, "Failed to check weather", 500, err.message);
  }
}

module.exports = { identify, getAllPlants, getPlantById, diagnose, weatherCheck };
