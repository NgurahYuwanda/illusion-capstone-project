const db = require("../config/database");

exports.addDetectionResult = async (req, res) => {
  const { imageId, accuracy, result } = req.body;

  try {
    const [resultData] = await db.query("INSERT INTO detection (image_id, accuracy, result) VALUES (?, ?, ?)", [imageId, accuracy, result]);

    res.status(201).json({
      message: "Detection result added successfully!",
      detectionId: resultData.insertId,
    });
  } catch (error) {
    console.error("Error adding detection result:", error);
    res.status(500).json({ error: "Failed to add detection result" });
  }
};

exports.getDetectionByImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const [detection] = await db.query("SELECT detection_id, accuracy, result, detected_at " + "FROM detection WHERE image_id = ?", [imageId]);

    if (detection.length === 0) {
      return res.status(404).json({ message: "No detection results found for this image" });
    }

    res.status(200).json(detection);
  } catch (error) {
    console.error("Error retrieving detection by image:", error);
    res.status(500).json({ error: "Failed to retrieve detection results" });
  }
};

exports.getAllDetections = async (req, res) => {
  try {
    const [detections] = await db.query(
      "SELECT detection.detection_id, images.title AS image_title, detection.accuracy, detection.result, detection.detected_at " + "FROM detection INNER JOIN images ON detection.image_id = images.image_id"
    );

    res.status(200).json(detections);
  } catch (error) {
    console.error("Error retrieving all detections:", error);
    res.status(500).json({ error: "Failed to retrieve detection results" });
  }
};

exports.updateDetectionResult = async (req, res) => {
  const detectionId = req.params.detectionId;
  const { accuracy, result } = req.body;

  try {
    const [updateResult] = await db.query("UPDATE detection SET accuracy = ?, result = ? WHERE detection_id = ?", [accuracy, result, detectionId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Detection result not found" });
    }

    res.status(200).json({ message: "Detection result updated successfully!" });
  } catch (error) {
    console.error("Error updating detection result:", error);
    res.status(500).json({ error: "Failed to update detection result" });
  }
};

exports.deleteDetectionResult = async (req, res) => {
  const detectionId = req.params.detectionId;

  try {
    const [deleteResult] = await db.query("DELETE FROM detection WHERE detection_id = ?", [detectionId]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Detection result not found" });
    }

    res.status(200).json({ message: "Detection result deleted successfully!" });
  } catch (error) {
    console.error("Error deleting detection result:", error);
    res.status(500).json({ error: "Failed to delete detection result" });
  }
};
