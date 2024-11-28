const express = require("express");
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");

const router = express.Router();

// Apply validator to the createUser route
router.post("/users", userValidator, userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
