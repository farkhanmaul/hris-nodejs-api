// const db2 = require("../config/database");
// const response = require("./response");
// const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");

// async function verifyDevice(req, res, next) {
//    const device_id = req.body.device_id;
//    if (!device_id) {
//       return response(HTTP_STATUS.UNAUTHORIZED, "01", "Unauthorized", {}, res, req);
//    }

//    try {
//       const query = `SELECT employee_id, expired_at, device_id FROM user_device WHERE device_id = '${device_id}' `;
//       const result = await db2.query(query);

//       if (!result || !result.length || !result[0].length) {
//          return response(HTTP_STATUS.FORBIDDEN, "02", "Forbidden", {}, res, req);
//       }

//       if (typeof next === "function") {
//          next();
//       } else {
//          return response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Success", {}, res, req);
//       }
//    } catch (error) {
//       console.error("Failed to verify device:", error);
//       return response(HTTP_STATUS.INTERNAL_SERVER_ERROR, RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR, {}, res, req);
//    }
// }

// module.exports = verifyDevice;
