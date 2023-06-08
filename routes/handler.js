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
         .json({ msg: "Password dan Confirm Password tidak cocok" });
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

// TO DO : Bikin validasi user ID & informationID
// History handler
async function addHistory(req, res) {
   try {
      const { userId, informationId, urlImage, isFavorite } = req.body;
      const createdDate = new Date().toISOString();

      const query = `INSERT INTO history ( userId,	informationId,	urlImage, isFavorite, createdDate) VALUES ( ${db.escape(
         userId
      )},${db.escape(informationId)},${db.escape(urlImage)},${db.escape(
         isFavorite
      )}, ${db.escape(createdDate)})`;
      await db.query(query);

      res.status(201).json({ message: "History added successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
};
