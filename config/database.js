const mysql = require("mysql2");

// Create the pool
const pool = mysql.createPool({
   host: "34.70.225.8",
   user: "root",
   database: "capstone_v1",
   password: "freshcan23",
});

// Get a Promise wrapped instance of that pool
const db = pool.promise();

// Export the db instance for use in other modules
module.exports = db;
