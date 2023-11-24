const db2 = require("../config/database2");

async function allSelectGlobalVariables() {
   const query = `SELECT key_name, value FROM global_variables`;
   const result = await db2.query(query);
   return result[0];
}

async function specificSelectGlobalVariables(key_name) {
   try {
      const query = `SELECT key_name, value FROM global_variables WHERE key_name = ?`;
      const result = await db2.query(query, [key_name]);

      if (result && result[0] && result[0][0]) {
         return result[0][0];
      } else {
         return "undefined";
      }
   } catch (error) {
      console.error("Error:", error);
      return null;
   }
}

async function insertGlobalVariables(key_name, value) {
   const query = `INSERT INTO global_variables (key_name, value) VALUES (?, ?)`;

   db2.query(query, [key_name, value], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
}

async function deleteGlobalVariables(key_name) {
   const query = `DELETE FROM global_variables WHERE key_name = ?`;

   db2.query(query, [key_name], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
}
async function updateGlobalVariables(key_name, value) {
   const query = `UPDATE global_variables SET value = ? WHERE key_name = ?`;

   db2.query(query, [value, key_name], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
}
module.exports = {
   allSelectGlobalVariables,
   specificSelectGlobalVariables,
   insertGlobalVariables,
   deleteGlobalVariables,
   updateGlobalVariables,
};
