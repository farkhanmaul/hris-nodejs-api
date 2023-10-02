const db = require("../config/database");
const response = require("./response");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];
   if (!apiKey) {
      return response(401, "01", "Unauthorized", {}, res, req);
   }

   try {
      const query = `SELECT employeeId, token, expiredAt, status FROM user_token WHERE token = '${apiKey}' `;
      const result = await db.query(query);

      if (!result || !result.length || !result[0].length) {
         return response(403, "02", "Forbidden", {}, res, req);
      }

      const { employeeId, expiredAt, status } = result[0][0];

      if (employeeId !== req.body.employeeId) {
         return response(
            403,
            "04",
            "Token does not match employee ID",
            {},
            res,
            req
         );
      }
      if (new Date() > new Date(expiredAt)) {
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
