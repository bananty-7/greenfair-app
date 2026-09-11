const express = require("express");
const router = express.Router();
const {
  addToGarden,
  listGarden,
  updateGardenPlant,
  removeFromGarden,
} = require("../controllers/gardenController");

router.post("/", addToGarden);
router.get("/:userId", listGarden);
router.patch("/:id", updateGardenPlant);
router.delete("/:id", removeFromGarden);

module.exports = router;
