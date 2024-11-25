const express = require("express");
const router = express.Router();
const detectionController = require("../controllers/detectionController");

router.post("/", detectionController.addDetectionResult);
router.get("/images/:imageId", detectionController.getDetectionByImage);
router.get("/", detectionController.getAllDetections);
router.put("/:detectionId", detectionController.updateDetectionResult);
router.delete("/:detectionId", detectionController.deleteDetectionResult);

module.exports = router;
