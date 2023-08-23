const sql = require("mssql");

async function db2() {
   try {
      await sql.connect({
         user: "admin",
         password: "admin",
         server: "WARZONE",
         database: "LiteErp",
         options: {
            encrypt: true, // If using Azure SQL Database, set to true
         },
      });
      console.log("Connected to SQL Server");
   } catch (error) {
      console.error("Failed to connect to SQL Server:", error);
      throw error; // Rethrow the error to be caught by the caller
   }
}

module.exports = db2;
