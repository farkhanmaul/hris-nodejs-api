const mysql = require("mysql2");

const pool = mysql.createPool({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   database: process.env.DB_NAME || "mdbportalaca",
   password: process.env.DB_PASSWORD || "",
});

const db3 = pool.promise();

db3.getConnection()
   .then(() => {
      console.log("DB mdbportalaca connection successful");
   })
   .catch((err) => {
      console.error("Error connecting to the database:", err);
   });

module.exports = db3;
