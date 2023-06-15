const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../middleware/response");

// Register Handler
async function registerHandler(req, res) {
   const { name, email, password, confPassword } = req.body;
   if (password !== confPassword) {
      return res
         .status(400)
         .json({ message: "Password dan Confirm Password tidak cocok" });
   }

   try {
      // Check if email already exists
      const query = `SELECT * FROM user WHERE email = "${email}"`;
      const [rows, fields] = await db.query(query);
      if (rows.length > 0) {
         return res.status(409).json({ message: "Email already exists" });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new user into the database
      const insertQuery = `INSERT INTO user (name, email, password) VALUES (${db.escape(
         name
      )}, ${db.escape(email)}, ${db.escape(hashedPassword)})`;
      await db.query(insertQuery);
      // await db.query(insertQuery);

      // Generate JWT token
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: "7d",
      });

      res.status(201).json({ message: "Register successed", token });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
}

// Login Handler
async function loginUser(req, res) {
   const { email, password } = req.body;

   // Check if the user exists in the database
   const query = `SELECT * FROM user WHERE email = '${email}'`;
   const [rows, fields] = await db.query(query);
   if (!rows || !rows.length) {
      res.status(401).send("Invalid email or password");
   } else {
      // Check if the password is correct
      const hashedPassword = rows[0].password;
      if (bcrypt.compareSync(password, hashedPassword)) {
         // Generate a JWT token
         const accessToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret",
            {
               expiresIn: "7d",
            }
         );

         res.json({ accessToken, email });
      } else {
         res.status(401).send("Invalid email or password");
      }
   }
}

async function logoutUser(req, res) {
   try {
      // Clear the token from the client-side
      res.clearCookie("accessToken");
      res.status(200).json({ message: "User logged out" });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: "Internal server error",
         error: error.message,
      });
   }
}

async function getDataUser(req, res) {
   try {
      const sql = `SELECT name, email FROM user WHERE email = '${req.email}'`;
      const [rows, fields] = await db.query(sql);
      response(200, rows[0], "get data user", res);
   } catch (error) {
      res.status(500).json({
         message: "Internal server error",
         error: error.message,
      });
   }
}

// Information Handler
async function getAllInformationHandler(req, res) {
   try {
      const sql = "SELECT * FROM information";
      const [rows, fields] = await db.query(sql);
      response(200, rows, "get all information", res);
   } catch (error) {
      return res.status(500);
   }
}

async function findBenefitHandler(req, res) {
   try {
      const sql = `SELECT benefit FROM information WHERE name="${req.query.name}"`;
      const [rows, fields] = await db.query(sql);
      response(200, rows, "find benefit", res);
   } catch (error) {
      return res.status(500);
   }
}

async function getSpecificBuahHandler(req, res) {
   const name = req.params.name;
   try {
      const sql = `SELECT * FROM information WHERE name="${req.params.name}"`;
      const [rows, fields] = await db.query(sql);
      response(200, rows[0], `spesifik buah dengan nama ${name}`, res);
   } catch (error) {
      return res.status(500);
   }
}

// TODO: Tambahkan Get Specific History buat lihat detail info + hasil predict

// History handler

async function getHistory(req, res) {
   try {
      const sql = `SELECT * FROM history WHERE userEmail = '${req.email}'`;
      const [rows, fields] = await db.query(sql);
      response(200, rows, "get history user", res);
   } catch (error) {
      return res.status(500);
   }
}

async function getSpecificHistory(req, res) {
   try {
      const id = req.query.id;
      const informationName = req.query.InformationName;
      const sql = `SELECT * FROM history WHERE userEmail = '${req.email}' AND id = '${id}'`;
      const [rows, fields] = await db.query(sql);

      const sql2 = `SELECT * FROM information WHERE name = '${informationName}'`;
      const [rows2, fields2] = await db.query(sql2);
      const hasil = {
         queryHistory: rows,
         queryInformation: rows2,
      };
      response(200, hasil, "get specific history", res);
   } catch (error) {
      return res.status(500);
   }
}

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { Storage } = require("@google-cloud/storage");
const FormData = require("form-data");
const storage = new Storage({
   projectId: "c131dsx0880-2023", // Replace with your GCP project ID
   keyFilename: "freshcan-storage.json", // Replace with the path to your service account key file
});
const bucketName = "freshcancoba1"; // Replace with the name of your Google Cloud Storage bucket
const bucket = storage.bucket(bucketName);
const url = process.env.URL_ML;

async function uploadImage(req, res) {
   const file = req.file;
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

      const fileExtension = path.extname(req.file.originalname);
      const uuid = uuidv4();
      const fileName = uuid.toString() + fileExtension;
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
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Add to history table
            const str = responseAI.data;
            const arr = str.split(" ");
            const buah = arr[1];
            const kondisi = arr[0];
            const persen = arr[2];
            const createdDate = new Date().toLocaleString("en-US", {
               timeZone: "Asia/Jakarta",
               hour12: false,
            });

            const query =
               "INSERT INTO history (userEmail, informationName, `condition`, percentage, urlImage, createdDate) VALUES (?, ?, ?, ?, ?, ?)";
            const params = [
               req.email,
               buah,
               kondisi,
               persen,
               publicUrl,
               createdDate,
            ];
            const [rows, fields2] = await db.query(query, params);
            const hasil = {
               id: rows.insertId,
               informationName: buah,
            };
            response(
               200,
               hasil,
               `Uploaded the file successfully: ${req.file.originalname}`,
               res
            );
         });
   } catch (error) {
      console.error("Error uploading file:", error);
      res.status(401).send("Error uploading file");
   }
}

module.exports = {
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
};
