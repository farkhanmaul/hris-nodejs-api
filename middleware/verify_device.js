// const db2 = require("../config/database");
// const response = require("./response");

// async function verifyDevice(req, res, next) {
//    const device_id = req.body.device_id;
//    if (!device_id) {
//       return response(401, "01", "Unauthorized", {}, res, req);
//    }

//    try {
//       const query = `SELECT employee_id, expired_at, device_id FROM user_device WHERE device_id = '${device_id}' `;
//       const result = await db2.query(query);

//       if (!result || !result.length || !result[0].length) {
//          return response(403, "02", "Forbidden", {}, res, req);
//       }

//       if (typeof next === "function") {
//          next();
//       } else {
//          return response(200, "00", "Success", {}, res, req);
//       }
//    } catch (error) {
//       console.error("Failed to verify device:", error);
//       return response(500, "99", "Internal Server Error", {}, res, req);
//    }
// }

// module.exports = verifyDevice;