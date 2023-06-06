const mysql = require("mysql");

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "capstone_v1",
});

module.exports = db;
