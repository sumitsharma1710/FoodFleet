const express = require("express");
const { registerUser } = require("./userController.js");

const router = express.Router();

router.route("/user/v1/signup").post(registerUser);

module.exports = router;