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
      const sql = `SELECT * FROM user WHERE email = '${req.email}'`;
      const [rows, fields] = await db.query(sql);
      response(200, rows[0], "get data user", res);
   } catch (error) {
      return res.status(500);
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
   const sql = `SELECT * FROM information WHERE name="${req.params.name}"`;
   try {
      const [rows, fields] = await db.query(sql);
      response(200, rows[0], `spesifik buah dengan nama ${name}`, res);
   } catch (error) {
      return res.status(500);
   }
}

// TODO: Tambahkan Get Specific History buat lihat detail info + hasil predict
// TODO: Tambahkan kolom hasil prediksi(fresh/rotten) dan presentase di tabel history

// History handler
async function addHistory(req, res) {
   try {
      const isFavorite = 0;
      const { informationName, urlImage } = req.body;
      const createdDate = new Date().toLocaleString("en-US", {
         timeZone: "Asia/Jakarta",
         hour12: false,
      });

      const query = `INSERT INTO history (userEmail, informationName, urlImage, createdDate, isFavorite) VALUES (?, ?, ?, ?, ?)`;
      const params = [
         req.email,
         informationName,
         urlImage,
         createdDate,
         isFavorite,
      ];

      await db.query(query, params);

      res.status(201).json({ message: "History added successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
}

async function getHistory(req, res) {
   try {
      const sql = `SELECT * FROM history WHERE userEmail = '${req.email}'`;
      const [rows, fields] = await db.query(sql);
      response(200, rows, "get history user", res);
   } catch (error) {
      return res.status(500);
   }
}

// Favorite handler
async function addFavorite(req, res) {
   try {
      const { createdDate } = req.body;
      const query = `SELECT * FROM history WHERE userEmail = '${req.email}'`;
      const [rows, fields] = await db.query(query);
      if (!rows || !rows.length) {
         res.status(401).send("Tidak ada history");
      } else {
         const favoriteQuery = `UPDATE history SET isFavorite = 1 WHERE userEmail = ? AND createdDate = ?`;
         const params = [req.email, createdDate];
         await db.query(favoriteQuery, params);
         res.status(200).json({ message: "Berhasil menambahkan favorite" });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
}

async function deleteFavorite(req, res) {
   try {
      const { createdDate } = req.body;
      const query = `SELECT * FROM history WHERE userEmail = '${req.email}'`;
      const [rows, fields] = await db.query(query);
      if (!rows || !rows.length) {
         res.status(401).send("Tidak ada history");
      } else {
         const favoriteQuery = `UPDATE history SET isFavorite = 0 WHERE userEmail = ? AND createdDate = ?`;
         const params = [req.email, createdDate];
         await db.query(favoriteQuery, params);
         res.status(200).json({ message: "Berhasil menambahkan favorite" });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
}

async function getFavorite(req, res) {
   try {
      const query = `SELECT * FROM history WHERE userEmail = '${req.email}' AND isFavorite = 1`;
      const [rows, fields] = await db.query(query);
      if (!rows || !rows.length) {
         res.status(401).send("Tidak ada favorite");
      } else {
         response(200, rows, "get favorite history", res);
      }
   } catch (error) {
      return res.status(500);
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
   addHistory,
   getHistory,
   addFavorite,
   deleteFavorite,
   getFavorite,
};
