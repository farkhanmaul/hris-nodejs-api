const db = require("../config/database");

async function verifyToken(employeeId, token) {
   try {
      const query = `SELECT employeeId, token, expiredAt FROM user_token WHERE employeeId = '${employeeId}'`;
      const result = await db.query(query);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_token table or no token exists
         return {
            respCode: "01",
            respMsg: "Employee ID not found or no token exists",
            data: {},
         };
      } else {
         const {
            employeeId: storedEmployeeId,
            token: storedToken,
            expiredAt,
         } = result[0][0];

         // Check if token is expired
         if (new Date() > new Date(expiredAt)) {
            return {
               respCode: "02",
               respMsg: "Token has expired",
               data: {},
            };
         } else {
            // Verify the token
            if (token === storedToken) {
               return {
                  respCode: "00",
                  respMsg: "Token verified",
                  data: {
                     employeeId: storedEmployeeId,
                  },
               };
            } else {
               return {
                  respCode: "03",
                  respMsg: "Invalid token",
                  data: {},
               };
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify token:", error);
      return {
         respCode: "99",
         respMsg: "Internal Server Error",
         data: {},
      };
   }
}

module.exports = verifyToken;
