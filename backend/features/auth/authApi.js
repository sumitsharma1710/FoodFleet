const express = require("express");
const { loginUser, logoutUser , forgotPassword, resetPassword } = require("./authController.js");

const router = express.Router();

router.route("/user/v1/login").post(loginUser);
router.route("/user/v1/logout").post(logoutUser);
router.route('/user/v1/forgotPassword').post(forgotPassword);
router.route('/user/v1/resetPassword/:token').post(resetPassword);


module.exports = router;