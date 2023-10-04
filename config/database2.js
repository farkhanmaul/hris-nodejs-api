const mysql = require("mysql2");

const pool = mysql.createPool({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   database: process.env.DB_NAME || "mdbacamobile",
   password: process.env.DB_PASSWORD || "",
});

const db2 = pool.promise();

db2.getConnection()
   .then(() => {
      console.log("DB mdbacamobile connection successful");
   })
   .catch((err) => {
      console.error("Error connecting to the database:", err);
   });

module.exports = db2;
