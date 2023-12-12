const db2 = require("../config/database2.js");
const response = require("./response.js");
const userModel = require("../models/user_model.js");
const validation = require("../utils/validation.js");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];

   if (!apiKey) {
      return response(HTTP_STATUS.UNAUTHORIZED, "90", "Unauthorized", {}, res, req);
   }

   if (!validation.validateUserInput(apiKey)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const query = `SELECT token, expired_at, is_active FROM user_token WHERE token = '${apiKey}' `;
      const result = await db2.query(query);

      if (!result || !result.length || !result[0].length) {
         return response(HTTP_STATUS.FORBIDDEN, "91", "Forbidden", {}, res, req);
      }

      const { expired_at, is_active } = result[0][0];

      if (new Date() > new Date(expired_at)) {
         await userModel.closeToken(apiKey);
         return response(HTTP_STATUS.FORBIDDEN, "93", "Token has expired", {}, res, req);
      }
      if (is_active === false) {
         return response(HTTP_STATUS.FORBIDDEN, "94", "Token is closed", {}, res, req);
      }

      if (typeof next === "function") {
         next();
      } else {
         return response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Success", {}, res, req);
      }
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

module.exports = verifyToken;
