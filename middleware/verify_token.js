const db2 = require("../config/database2");
const response = require("./response");
const userModel = require("../models/user_model");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];
   if (!apiKey) {
      return response(401, "01", "Unauthorized", {}, res, req);
   }

   try {
      const query = `SELECT employee_id, token, expired_at, status FROM user_token WHERE token = '${apiKey}' `;
      const result = await db2.query(query);

      if (!result || !result.length || !result[0].length) {
         return response(403, "02", "Forbidden", {}, res, req);
      }

      const { employee_id, expired_at, status } = result[0][0];

      if (employee_id !== req.body.employee_id) {
         return response(
            403,
            "04",
            "Token does not match employee ID",
            {},
            res,
            req
         );
      }
      if (new Date() > new Date(expired_at)) {
         await userModel.closeToken(apiKey);
         return response(403, "03", "Token has expired", {}, res, req);
      }
      if (status === "closed") {
         return response(403, "05", "Token is closed", {}, res, req);
      }

      if (typeof next === "function") {
         next();
      } else {
         return response(200, "00", "Success", {}, res, req);
      }
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(500, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = verifyToken;