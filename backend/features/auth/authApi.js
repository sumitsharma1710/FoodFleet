const express = require("express"); // Import express framework
const { loginUser, logoutUser, forgotPassword, resetPassword } = require("./authController.js"); // Import controller functions

const authMiddleware = require('../../middleware/auth.js')

const router = express.Router(); // Create a new router instance

// Define routes for user authentication
router.route("/user/v1/login").post(loginUser); // Route for user login
router.route("/user/v1/logout").post(authMiddleware, logoutUser); // Route for user logout
router.route('/user/v1/forgotPassword').post(forgotPassword); // Route for forgot password
router.route('/user/v1/resetPassword/:token').post(resetPassword); // Route for resetting password with token

module.exports = router; // Export the router
