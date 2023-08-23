const express = require("express");
const router = express.Router();
const { loginUser, handleSendOTP, handleVerifyOTP } = require("./handler");

router.post("/login", loginUser);
router.post("/handleSendOTP", handleSendOTP);
router.post("/handleVerifyOTP", handleVerifyOTP);

module.exports = router;
