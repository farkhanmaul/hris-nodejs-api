const db2 = require("../config/database2");
const response = require("./response");
const userModel = require("../models/user_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];
   const { employee_id } = req.body;

   if (!apiKey || !employee_id) {
      return response(HTTP_STATUS.UNAUTHORIZED, "90", "Unauthorized", {}, res, req);
   }
   const isEmployeeIdValid = validation.validateUserInput(employee_id);
   const isAPIKeyValid = validation.validateUserInput(apiKey);

   if (!isEmployeeIdValid || !isAPIKeyValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const query = `SELECT employee_id, token, expired_at, status FROM user_token WHERE token = '${apiKey}' `;
      const result = await db2.query(query);

      if (!result || !result.length || !result[0].length) {
         return response(HTTP_STATUS.FORBIDDEN, "91", "Forbidden", {}, res, req);
      }

      const { employee_id, expired_at, status } = result[0][0];

      if (employee_id !== req.body.employee_id) {
         return response(HTTP_STATUS.FORBIDDEN, "92", "Token does not match employee ID", {}, res, req);
      }
      if (new Date() > new Date(expired_at)) {
         await userModel.closeToken(apiKey);
         return response(HTTP_STATUS.FORBIDDEN, "93", "Token has expired", {}, res, req);
      }
      if (status === "closed") {
         return response(HTTP_STATUS.FORBIDDEN, "94", "Token is closed", {}, res, req);
      }

      if (typeof next === "function") {
         next();
      } else {
         return response(HTTP_STATUS.OK, "00", "Success", {}, res, req);
      }
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = verifyToken;
