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
   getHistory,
   addFavorite,
   getFavorite,
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
router.post("/addhistory", verifyToken, addHistory);
router.get("/gethistory", verifyToken, getHistory);

// Favorite Endpoint
router.post("/addfavorite", verifyToken, addFavorite);
router.get("/getfavorite", verifyToken, getFavorite);

module.exports = router;
