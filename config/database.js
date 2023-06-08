const mysql = require("mysql2");
// create the pool
const pool = mysql.createPool({
   host: "localhost",
   user: "root",
   database: "capstone_v1",
});
// now get a Promise wrapped instance of that pool
const db = pool.promise();

module.exports = db;
