const db = require("../config/database");
function logAPICall(logData) {
   const query = "INSERT INTO api_logs SET ?";

   db.query(query, logData, (error, results) => {
      if (error) {
         console.error("Failed to write API log:", error);
      }
   });
}

module.exports = logAPICall;
