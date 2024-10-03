const express = require("express"); // Import express framework
const { registerUser } = require("./userController.js"); // Import user registration controller

const router = express.Router(); // Create a new router instance

// Define route for user signup
router.route("/user/v1/signup").post(registerUser); // Handle POST requests to signup endpoint

module.exports = router; // Export the router
