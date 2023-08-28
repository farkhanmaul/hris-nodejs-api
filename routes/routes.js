const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const {
   login,
   loginOTP,
   userProfile,
   attendance,
   verifyTokenHandler,
   logout,
   getAttendance,
} = require("./handler");

router.post("/login", login);
router.post("/login-otp", loginOTP);
router.post("/logout", verifyToken, logout);
router.post("/user", verifyToken, userProfile);
router.post("/user-attendance", verifyToken, getAttendance);
router.post("/attendance", verifyToken, attendance);
router.post("/verify-token", verifyTokenHandler);

module.exports = router;
