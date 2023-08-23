const mysql = require("mysql2");

// Create the pool
const pool = mysql.createPool({
   host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
});

// Get a Promise wrapped instance of that pool
const db = pool.promise();

// Export the db instance for use in other modules
module.exports = db;
