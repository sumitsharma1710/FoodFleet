const express = require("express"); // Import express framework
const { registerUser , getUser } = require("./userController.js"); // Import user registration controller

const router = express.Router(); // Create a new router instance

// Define route for user signup
router.route("/user/v1/signup").post(registerUser); // Handle POST requests to signup endpoint
router.route("/user/v1/user/details").get(getUser);

module.exports = router; // Export the router
