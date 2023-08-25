const db = require("../config/database");
const response = require("../middleware/response");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];
   if (!apiKey) {
      return response(401, "01", "Unauthorized", {}, res);
   }

   try {
      const query = `SELECT employeeId, token, expiredAt FROM user_token WHERE token = '${apiKey}'`;
      const result = await db.query(query);

      if (!result || !result.length || !result[0].length) {
         return response(403, "02", "Forbidden", {}, res);
      }

      const { employeeId, expiredAt } = result[0][0];

      if (new Date() > new Date(expiredAt)) {
         return response(403, "03", "Token has expired", {}, res);
      }

      // if (employeeId !== req.employeeId) {
      //    return response(
      //       403,
      //       "04",
      //       "Token does not match employee ID",
      //       {},
      //       res
      //    );
      // }

      if (typeof next === "function") {
         next();
      } else {
         return response(200, "00", "Success", {}, res);
      }
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(500, "99", "Internal Server Error", {}, res);
   }
}

module.exports = verifyToken;
