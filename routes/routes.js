const express = require("express");
const router = express.Router();
const {
   loginUser,
   handleSendOTP,
   handleVerifyOTP,
   connectToSQLServer,
} = require("./handler");

router.post("/login", loginUser);
router.post("/handleSendOTP", handleSendOTP);
router.post("/handleVerifyOTP", handleVerifyOTP);
router.get("/connectToSQLServer", connectToSQLServer);

module.exports = router;
