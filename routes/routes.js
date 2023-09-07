const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");

const userController = require("../controller/userController");

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

router.post("/login", userController.login); // user/login
router.post("/login2", login2); // user/login2
router.post("/login-otp", userController.loginOTP); // user/login-otp
router.post("/logout", verifyToken, logout); // user/logout
router.post("/user", verifyToken, userController.userProfile); // user/get
router.post("/attendance", verifyToken, attendance); // user/attendance
router.post("/user-attendance", verifyToken, getAttendance); // user/get list atendance by day
router.post("/user-attendance-clock", verifyToken, getClockTime); // user/get clock data
router.post("/verify-token", verifyTokenHandler);

module.exports = router;
