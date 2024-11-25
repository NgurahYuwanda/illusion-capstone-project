const db = require("../config/database");

exports.addAccessHistory = async (req, res) => {
  const { userId, imageId } = req.body;

  try {
    const [result] = await db.query("INSERT INTO history (user_id, image_id) VALUES (?, ?)", [userId, imageId]);

    res.status(201).json({
      message: "Access history added successfully!",
      historyId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding access history:", error);
    res.status(500).json({ error: "Failed to add access history" });
  }
};

exports.getHistoryByImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const [history] = await db.query("SELECT history.history_id, history.accessed_at, users.username " + "FROM history INNER JOIN users ON history.user_id = users.user_id " + "WHERE history.image_id = ?", [imageId]);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error retrieving history by image:", error);
    res.status(500).json({ error: "Failed to retrieve history by image" });
  }
};

exports.getHistoryByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [history] = await db.query("SELECT history.history_id, history.accessed_at, images.title, images.image_path " + "FROM history INNER JOIN images ON history.image_id = images.image_id " + "WHERE history.user_id = ?", [userId]);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error retrieving history by user:", error);
    res.status(500).json({ error: "Failed to retrieve history by user" });
  }
};

exports.deleteHistoryByImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    await db.query("DELETE FROM history WHERE image_id = ?", [imageId]);

    res.status(200).json({ message: "Access history deleted successfully!" });
  } catch (error) {
    console.error("Error deleting history by image:", error);
    res.status(500).json({ error: "Failed to delete access history" });
  }
};

exports.deleteHistoryByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    await db.query("DELETE FROM history WHERE user_id = ?", [userId]);

    res.status(200).json({ message: "Access history for user deleted successfully!" });
  } catch (error) {
    console.error("Error deleting history by user:", error);
    res.status(500).json({ error: "Failed to delete access history for user" });
  }
};
