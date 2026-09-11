/**
 * Generic Symptom -> Diagnosis mapping.
 * Used by the "Daily Health Check" feature: the user answers a few quick
 * questions (or the vision model tags visual symptoms) and we return a
 * likely diagnosis + remedy. This is a rule-based fallback that works
 * even without a trained ML disease-classification model.
 */

module.exports = [
  {
    symptomKeywords: ["yellow leaves", "yellowing", "chlorosis"],
    possibleCauses: [
      {
        cause: "Overwatering / poor drainage",
        likelihood: "high",
        remedy:
          "Let soil dry out between watering, check pot drainage holes, repot with well-draining mix if roots smell foul.",
      },
      {
        cause: "Nitrogen deficiency",
        likelihood: "medium",
        remedy: "Apply a balanced nitrogen-rich fertilizer or compost.",
      },
      {
        cause: "Natural aging of lower leaves",
        likelihood: "low",
        remedy: "No action needed if only oldest, lowest leaves are affected.",
      },
    ],
  },
  {
    symptomKeywords: ["brown spots", "leaf spot", "black spots"],
    possibleCauses: [
      {
        cause: "Fungal leaf spot disease",
        likelihood: "high",
        remedy:
          "Remove and destroy affected leaves, avoid wetting foliage when watering, apply copper-based fungicide or neem oil every 7 days.",
      },
      {
        cause: "Bacterial spot",
        likelihood: "medium",
        remedy: "Apply copper bactericide, improve air circulation, avoid working with wet plants.",
      },
    ],
  },
  {
    symptomKeywords: ["white powder", "powdery mildew", "white coating"],
    possibleCauses: [
      {
        cause: "Powdery mildew (fungal)",
        likelihood: "high",
        remedy:
          "Spray a mix of 1 tsp baking soda + few drops liquid soap in 1L water weekly, or use sulfur-based fungicide. Improve airflow around plant.",
      },
    ],
  },
  {
    symptomKeywords: ["wilting", "drooping", "limp leaves"],
    possibleCauses: [
      {
        cause: "Underwatering",
        likelihood: "high",
        remedy: "Water deeply and check soil moisture 2-3 cm below surface before next watering.",
      },
      {
        cause: "Root rot from overwatering",
        likelihood: "medium",
        remedy: "Check roots — if brown/mushy, trim rotted roots and repot in fresh dry soil.",
      },
      {
        cause: "Root-bound plant / small pot",
        likelihood: "low",
        remedy: "Repot into a larger container with fresh soil.",
      },
    ],
  },
  {
    symptomKeywords: ["holes in leaves", "chewed leaves", "eaten leaves"],
    possibleCauses: [
      {
        cause: "Caterpillars / leaf-eating insects",
        likelihood: "high",
        remedy: "Handpick visible pests, apply neem oil or Bacillus thuringiensis (Bt) spray in the evening.",
      },
      {
        cause: "Slugs/snails (usually irregular holes, night damage)",
        likelihood: "medium",
        remedy: "Use crushed eggshell/diatomaceous earth barrier around base, or beer traps.",
      },
    ],
  },
  {
    symptomKeywords: ["sticky leaves", "honeydew", "sooty mold", "black mold"],
    possibleCauses: [
      {
        cause: "Aphid / mealybug / scale infestation (sap-sucking pests)",
        likelihood: "high",
        remedy:
          "Wipe leaves with soapy water, spray neem oil solution every 5-7 days, introduce ladybugs if outdoors.",
      },
    ],
  },
  {
    symptomKeywords: ["curling leaves", "leaf curl", "distorted leaves"],
    possibleCauses: [
      {
        cause: "Viral infection (leaf curl virus)",
        likelihood: "medium",
        remedy: "Remove and destroy infected plant to prevent spread; control whitefly vectors with neem oil.",
      },
      {
        cause: "Aphid infestation",
        likelihood: "high",
        remedy: "Spray neem oil or insecticidal soap directly on new growth where aphids cluster.",
      },
      {
        cause: "Heat/water stress",
        likelihood: "medium",
        remedy: "Provide shade during peak heat and maintain consistent watering schedule.",
      },
    ],
  },
  {
    symptomKeywords: ["no flowers", "not flowering", "no blooms"],
    possibleCauses: [
      {
        cause: "Insufficient sunlight",
        likelihood: "high",
        remedy: "Move plant to a spot with more direct sunlight (check species-specific requirement).",
      },
      {
        cause: "Excess nitrogen fertilizer",
        likelihood: "medium",
        remedy: "Switch to a phosphorus-rich (bloom booster) fertilizer.",
      },
      {
        cause: "Plant not yet mature",
        likelihood: "medium",
        remedy: "Check the species' typical time-to-flower; some plants need 2-3 years to mature.",
      },
    ],
  },
  {
    symptomKeywords: ["dropping flowers", "flower drop", "buds falling"],
    possibleCauses: [
      {
        cause: "Water stress (too much or too little)",
        likelihood: "high",
        remedy: "Maintain consistent watering schedule matched to the plant's specific needs.",
      },
      {
        cause: "Temperature extremes during flowering",
        likelihood: "medium",
        remedy: "Provide shade cloth in extreme heat or move potted plants indoors during cold snaps.",
      },
    ],
  },
  {
    symptomKeywords: ["mushy stem", "black stem", "rotting base"],
    possibleCauses: [
      {
        cause: "Stem/crown rot (fungal, from overwatering)",
        likelihood: "high",
        remedy:
          "Cut away all rotted tissue with a sterile blade, apply cinnamon or fungicide powder to the cut, reduce watering drastically.",
      },
    ],
  },
];
