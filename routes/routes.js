const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {
   validateLoginInput,
   validateRegisterInput,
} = require("../middleware/validation.js");
const {
   registerHandler,
   loginUser,
   logoutUser,
   getDataUser,
   getAllInformationHandler,
   findBenefitHandler,
   getSpecificBuahHandler,
   addHistory,
} = require("./handler");

// Register Endpoint
router.post("/register", validateRegisterInput, registerHandler);

// Login Endpoint
router.post("/login", validateLoginInput, loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/datauser", verifyToken, getDataUser);

// Information Endpoint
router.get("/", verifyToken, getAllInformationHandler);
router.get("/find", verifyToken, findBenefitHandler);
router.get("/buah/:name", verifyToken, getSpecificBuahHandler);

// History Endpoint
router.post("/history", verifyToken, addHistory);

module.exports = router;
