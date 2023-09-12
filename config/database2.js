const sql = require("mssql");

async function db2(query) {
   try {
      const pool = await sql.connect({
         user: process.env.DB_USER_ERP || "admin",
         password: process.env.DB_PASSWORD_ERP || "admin",
         server: process.env.DB_SERVER_ERP,
         database: process.env.DB_DATABASE_ERP || "LiteErp",
         port: parseInt(process.env.DB_PORT_ERP, 10) || "1433",
         options: {
            encrypt: false,
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
