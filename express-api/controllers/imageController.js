const db = require("../config/database");

exports.uploadImage = async (req, res) => {
  const { userId, title, description, tags, imagePath } = req.body;

  try {
    const [result] = await db.query("INSERT INTO images (user_id, title, description, tags, image_path) VALUES (?, ?, ?, ?, ?)", [userId, title, description, tags, imagePath]);

    res.status(201).json({
      message: "Image uploaded successfully!",
      imageId: result.insertId,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.getUserImages = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [images] = await db.query(
      "SELECT images.image_id, images.title, images.description, images.tags, images.status, images.upload_date, " +
        "detection.accuracy, detection.result, detection.detected_at " +
        "FROM images LEFT JOIN detection ON images.image_id = detection.image_id " +
        "WHERE images.user_id = ?",
      [userId]
    );

    res.status(200).json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ error: "Failed to retrieve images" });
  }
};

exports.analyzeImage = async (req, res) => {
  const { imageId, accuracy, result } = req.body;

  try {
    const [resultInsert] = await db.query("INSERT INTO detection (image_id, accuracy, result) VALUES (?, ?, ?)", [imageId, accuracy, result]);

    await db.query("UPDATE images SET status = ? WHERE image_id = ?", ["processed", imageId]);

    res.status(200).json({
      message: "Image analyzed successfully!",
      detectionId: resultInsert.insertId,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
};

exports.deleteImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    await db.query("DELETE FROM images WHERE image_id = ?", [imageId]);

    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

exports.getAccessHistory = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const [history] = await db.query("SELECT history.history_id, history.accessed_at, users.username " + "FROM history INNER JOIN users ON history.user_id = users.user_id " + "WHERE history.image_id = ?", [imageId]);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error retrieving access history:", error);
    res.status(500).json({ error: "Failed to retrieve access history" });
  }
};

exports.addAccessHistory = async (req, res) => {
  const { userId, imageId } = req.body;

  try {
    await db.query("INSERT INTO history (user_id, image_id) VALUES (?, ?)", [userId, imageId]);

    res.status(201).json({ message: "Access history added successfully!" });
  } catch (error) {
    console.error("Error adding access history:", error);
    res.status(500).json({ error: "Failed to add access history" });
  }
};
