const mysql = require("mysql2");

// Create the pool
const pool = mysql.createPool({
   host: "localhost",
   user: "root",
   database: "capstone_v1",
});

// Get a Promise wrapped instance of that pool
const db = pool.promise();

// Export the db instance for use in other modules
module.exports = db;
