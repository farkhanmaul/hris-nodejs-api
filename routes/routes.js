const express = require("express");
const router = express.Router();
const { loginUser, getemail } = require("./handler");

router.post("/login", loginUser);

router.post("/getemail", getemail);

module.exports = router;
