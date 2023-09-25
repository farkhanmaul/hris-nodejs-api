const mysql = require("mysql2");

const pool = mysql.createPool({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   database: process.env.DB_NAME || "abhimata1",
   password: process.env.DB_PASSWORD || "",
});

const db = pool.promise();

db.getConnection()
   .then(() => {
      console.log("Database connection successful");
   })
   .catch((err) => {
      console.error("Error connecting to the database:", err);
   });

module.exports = db;
