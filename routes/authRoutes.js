const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Adjust the path as per your project structure
const authMiddleware = require("../middlewares/authMiddleware"); // Adjust the path as per your project structure

// Route for user registration

router.post("/register", authController.register);

// Route for user login
router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;
