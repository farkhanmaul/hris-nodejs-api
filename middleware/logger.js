const db2 = require("../config/database2");
function logAPICall(logData) {
   const query = "INSERT INTO api_logs SET ?";

   db2.query(query, logData, (error, results) => {
      if (error) {
         console.error("Failed to write API log:", error);
      }
   });
}

module.exports = logAPICall;
