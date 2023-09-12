const mysql = require("mysql2");

const pool = mysql.createPool({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   database: process.env.DB_NAME || "abhimata1",
   password: process.env.DB_PASSWORD || "",
});

// Get a Promise wrapped instance of that pool
const db = pool.promise();

// Test the database connection
db.getConnection()
   .then(() => {
      console.log("Database connection successful");
   })
   .catch((err) => {
      console.error("Error connecting to the database:", err);
   });

// Export the db instance for use in other modules
module.exports = db;
