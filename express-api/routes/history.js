const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.post("/", historyController.addAccessHistory);
router.get("/images/:imageId", historyController.getHistoryByImage);
router.get("/users/:userId", historyController.getHistoryByUser);
router.delete("/images/:imageId", historyController.deleteHistoryByImage);
router.delete("/users/:userId", historyController.deleteHistoryByUser);

module.exports = router;
