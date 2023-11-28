const db2 = require("../config/database2");

async function getNotificationData(employee_id) {
   const query = `
      SELECT id, msg_title, msg_body, read_status, created_at
      FROM notification_inbox
      WHERE employee_id = ?
      ORDER BY created_at DESC
   `;
   const result = await db2.query(query, [employee_id]);
   return result;
}

module.exports = {
   getNotificationData,
};
