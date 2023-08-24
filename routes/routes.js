const express = require("express");
const router = express.Router();
const { login, verifyOTP } = require("./handler");

router.post("/login", login);
router.post("/login-otp", verifyOTP);

module.exports = router;
