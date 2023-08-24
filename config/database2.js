const sql = require("mssql");

async function db2(query) {
   try {
      const pool = await sql.connect({
         user: "admin",
         password: "admin",
         server: "WARZONE",
         database: "LiteErp",
         port: 1433,
         options: {
            encrypt: false, // If using Azure SQL Database, set to true
         },
      });

      const result = await pool.request().query(query);
      return result;
   } catch (error) {
      console.error("Failed to execute SQL query:", error);
      throw error;
   }
}

module.exports = db2;
