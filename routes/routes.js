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
   getHistory,
   getSpecificHistory,
   uploadImage,
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
router.get("/gethistory", verifyToken, getHistory);
router.get("/getspecifichistory", verifyToken, getSpecificHistory);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/upload/image", verifyToken, upload.single("file"), uploadImage);

module.exports = router;
