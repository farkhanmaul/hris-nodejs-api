const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../middleware/response");

// Functions for Query
const runQuery = (sql) => {
   return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
         if (err) {
            reject(err);
            return;
         }
         resolve(results);
      });
   });
};

// Register Handler
const registerHandler = async (req, res) => {
   const { name, email, password, confPassword } = req.body;
   if (password !== confPassword) {
      return res
         .status(400)
         .json({ msg: "Password dan Confirm Password tidak cocok" });
   }

   try {
      // Check if email already exists
      const query = `SELECT * FROM user WHERE email = "${email}"`;
      const exist = await runQuery(query);
      if (exist.length > 0) {
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

      // Generate JWT token
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: "7d",
      });

      res.status(201).json({ message: "Register successed", token });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
};

// Login Handler
const loginUser = async (req, res) => {
   const { email, password } = req.body;

   // Check if the user exists in the database
   const query = `SELECT * FROM user WHERE email = '${email}'`;
   const rows = await runQuery(query);
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

         res.json({ accessToken });
      } else {
         res.status(401).send("Invalid email or password");
      }
   }
};

const logoutUser = async (req, res) => {
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
};

const getDataUser = async (req, res) => {
   try {
      const query = `SELECT * FROM user WHERE email = '${req.email}'`;
      const rows = await runQuery(query);
      res.status(200).json(rows);
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: "Internal server error",
         error: error.message,
      });
   }
};

// Information Handler
function getAllInformationHandler(req, res) {
   const sql = "SELECT * FROM information";
   db.query(sql, (error, result) => {
      //hasil data dari mysql
      response(200, result, "get all information", res);
   });
}

function findBenefitHandler(req, res) {
   const sql = `SELECT benefit FROM information WHERE name="${req.query.name}"`;
   db.query(sql, (error, result) => {
      response(200, result, "find benefit", res);
   });
}

function getSpecificBuahHandler(req, res) {
   const name = req.params.name;
   const sql = `SELECT * FROM information WHERE name="${req.params.name}"`;
   db.query(sql, (error, result) => {
      response(200, result, `spesifik buah dengan nama ${name}`, res);
   });
}

// History handler
const addHistory = async (req, res) => {
   try {
      // const { userId, urlImage, informationId } = req.body;
      const { urlImage } = req.body;
      const createdDate = new Date().toISOString();

      // Insert new information into the database
      const insertQuery = `INSERT INTO history ( urlImage, createdDate) VALUES ( ${db.escape(
         urlImage
      )}, ${db.escape(createdDate)})`;
      await db.query(insertQuery);

      res.status(201).json({ message: "Information added successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
};

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
