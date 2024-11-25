const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("/upload", imageController.uploadImage);
router.get("/users/:userId", imageController.getUserImages);
router.post("/analyze", imageController.analyzeImage);
router.delete("/:imageId", imageController.deleteImage);
router.get("/:imageId/history", imageController.getAccessHistory);
router.post("/history", imageController.addAccessHistory);

module.exports = router;
