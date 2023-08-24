const express = require("express");
const router = express.Router();
const { login, verifyOTP } = require("./handler");

router.post("/login", login);
router.post("/otp", verifyOTP);

module.exports = router;
