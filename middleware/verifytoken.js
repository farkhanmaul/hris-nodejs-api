const db = require("../config/database");

async function verifyToken(req, res, next) {
   const apiKey = req.headers["x-api-key"];
   if (!apiKey) {
      return res.sendStatus(401);
   }

   try {
      const query = `SELECT employeeId, token, expiredAt FROM user_token WHERE token = '${apiKey}'`;
      const result = await db.query(query);

      if (!result || !result.length || !result[0].length) {
         return res.sendStatus(403);
      }

      const { employeeId, expiredAt } = result[0][0];

      if (new Date() > new Date(expiredAt)) {
         return res.sendStatus(403);
      }

      req.employeeId = employeeId;
      next();
   } catch (error) {
      console.error("Failed to verify token:", error);
      return res.sendStatus(500);
   }
}

module.exports = verifyToken;
