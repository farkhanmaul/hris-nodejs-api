const mysql = require("mysql2");

// Create the pool
const pool = mysql.createPool({
   host: process.env.HOST || "localhost",
   user: process.env.USER || "root",
   database: process.env.DATABASE,
   password: process.env.PASSWORD,
});

// Get a Promise wrapped instance of that pool
const db = pool.promise();

// Export the db instance for use in other modules
module.exports = db;
