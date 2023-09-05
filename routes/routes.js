const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const {
   login,
   login2,
   loginOTP,
   userProfile,
   attendance,
   verifyTokenHandler,
   logout,
   getAttendance,
   getClockTime,
} = require("./handler");

router.post("/login", login);
router.post("/login2", login2);
router.post("/login-otp", loginOTP);
router.post("/logout", verifyToken, logout);
router.post("/user", verifyToken, userProfile);
router.post("/attendance", verifyToken, attendance);
router.post("/user-attendance", verifyToken, getAttendance);
router.post("/user-attendance-clock", verifyToken, getClockTime);
router.post("/verify-token", verifyTokenHandler);

module.exports = router;
