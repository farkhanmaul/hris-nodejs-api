const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const {
   login,
   loginOTP,
   userProfile,
   userPresence,
   verifyTokenHandler,
   logout,
   getPresence,
} = require("./handler");

router.post("/login", login);
router.post("/login-otp", loginOTP);
router.post("/logout", verifyToken, logout);
router.post("/user", verifyToken, userProfile);
router.post("/user-presence", verifyToken, userPresence);
router.post("/get-presence", verifyToken, getPresence);
router.post("/verify-token", verifyTokenHandler);

module.exports = router;
