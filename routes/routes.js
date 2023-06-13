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
   deleteFavorite,
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
router.post("/deletefavorite", verifyToken, deleteFavorite);
router.get("/getfavorite", verifyToken, getFavorite);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");

const url = "https://machine-learningnew-va2i63hfta-uc.a.run.app/predict/image";
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
   projectId: "c131dsx0880-2023", // Replace with your GCP project ID
   keyFilename: "./freshcan-storage.json", // Replace with the path to your service account key file
});
const bucketName = "freshcancoba1"; // Replace with the name of your Google Cloud Storage bucket
const bucket = storage.bucket(bucketName);

const path = require("path");

const { v4: uuidv4 } = require("uuid");

router.post("/api/upload/image", upload.single("file"), async (req, res) => {
   const file = req.file;

   // rename the file and move it to the "uploads" directory
   // read the file from the file system
   const file2 = fs.createReadStream(file.path);

   // create a form data object and append the file to it
   const formData = new FormData();
   formData.append("file", file2, "data.jpg");
   try {
      const responseAI = await axios.post(url, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      responseAI.data;

      // get the file extension from req.file.originalname
      const fileExtension = path.extname(req.file.originalname);
      console.log(fileExtension);

      // generate a version 4 UUID
      const uuid = uuidv4();

      console.log("UUID:", uuid);
      const fileName = uuid.toString() + fileExtension;
      console.log(fileName);
      const blob = bucket.file(fileName);
      blob.createWriteStream();

      fs.createReadStream(req.file.path)
         .pipe(blob.createWriteStream({ gzip: true }))
         .on("error", function (err) {
            res.status(500).send({ message: err.message });
         })
         .on("finish", async function () {
            // The file upload is complete.
            // Create URL for direct file access via HTTP
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/image/${blob.name}`;

            return res.status(200).send({
               message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
               url: publicUrl,
               image: req.file.originalname,
               data: responseAI.data,
            });
         });
   } catch (error) {
      console.error("Error uploading file:", error);
      res.status(401).send("Error uploading file");
   }
});

module.exports = router;
