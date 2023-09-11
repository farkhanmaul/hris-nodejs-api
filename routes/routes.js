const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verify_token.js");

const userController = require("../controllers/user_controller.js");

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
   getLastAttendance,
} = require("./handler");

router.get("/", (req, res) => {
   res.send("API is running");
});
router.post("/login", userController.login); // user/login
router.post("/login2", userController.login2); // user/login2
router.post("/login-otp", userController.loginOTP); // user/login-otp
router.post("/user", verifyToken, userController.userProfile); // user/get
router.post("/attendance", verifyToken, userController.attendance); // user/attendance
router.post("/user-attendance", verifyToken, userController.getAttendance); // user/get list atendance by day
router.post("/user-attendance-clock", verifyToken, userController.getClockTime); // user/get clock data
router.post("/logout", verifyToken, userController.logout); // user/logout
router.post("/verify-token", userController.verifyTokenHandler);

router.post("/user-attendance-history", verifyToken, getAttendanceHistory); // user/get list atendance by day

router.post("/user-attendance-latest", verifyToken, getLastAttendance); // user/get list atendance by day
module.exports = router;
