const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const { login, verifyOTP, getProfile } = require("./handler");

router.post("/login", login);
router.post("/login-otp", verifyOTP);
router.post("/user", verifyToken, getProfile);

module.exports = router;
