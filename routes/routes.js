const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const {
   login,
   loginDummy,
   verifyOTP,
   getProfile,
   employeePresence,
   verifyTokenHandler,
} = require("./handler");

router.post("/login", login);
router.post("/login-otp", verifyOTP);
router.post("/user", verifyToken, getProfile);
router.post("/user-presence", verifyToken, employeePresence);
router.post("/login-dummy", loginDummy);
router.post("/verify-token", verifyTokenHandler);

module.exports = router;
