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
   getAttendanceHistory,
} = require("./handler");

router.post("/login", userController.login); // user/login
router.post("/login-otp", userController.loginOTP); // user/login-otp
router.post("/user", verifyToken, userController.userProfile); // user/get
router.post("/attendance", verifyToken, userController.attendance); // user/attendance
router.post("/user-attendance", verifyToken, userController.getAttendance); // user/get list atendance by day
router.post("/user-attendance-clock", verifyToken, userController.getClockTime); // user/get clock data
router.post("/logout", verifyToken, userController.logout); // user/logout
router.post("/verify-token", userController.verifyTokenHandler);
router.post("/login2", userController.login2); // user/login2

router.post("/user-attendance-history", verifyToken, getAttendanceHistory); // user/get list atendance by day
module.exports = router;
