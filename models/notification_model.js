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

async function storeFirebaseToken(employee_id, firebaseToken) {
   const selectQuery = `SELECT COUNT(*) AS count FROM user_fbtoken WHERE employee_id = ?`;
   const updateQuery = `UPDATE user_fbtoken SET token = ?, created_at = ?, is_status = true WHERE employee_id = ?`;
   const created_at = new Date();

   const [rows] = await db2.query(selectQuery, [employee_id]);
   const count = rows[0].count;

   if (count > 0) {
      // Employee ID already exists, perform an update
      await db2.query(updateQuery, [firebaseToken, created_at, employee_id]);
   } else {
      // Employee ID does not exist, perform an insert
      const insertQuery = `INSERT INTO user_fbtoken (employee_id, token, created_at, is_status) VALUES (?, ?, ?, true)`;
      await db2.query(insertQuery, [employee_id, firebaseToken, created_at]);
   }
}

async function getGuestDeviceTokens(guestIds) {
   try {
      const query = `SELECT token FROM user_fbtoken WHERE employee_id IN (?)`;
      const [rows] = await db2.query(query, [guestIds]);
      const deviceTokens = rows.map((row) => row.token);
      return deviceTokens;
   } catch (error) {
      console.error("Error fetching guest device tokens:", error);
      throw new Error("Failed to fetch guest device tokens");
   }
}

async function insertNotification(employeeId, title, body) {
   const insertQuery = `
      INSERT INTO notification_inbox (employee_id, msg_title, msg_body, read_status, created_at)
      VALUES (?, ?, ?, false, NOW())
   `;
   await db2.query(insertQuery, [employeeId, title, body]);
}

module.exports = {
   getNotificationData,
   storeFirebaseToken,
   getGuestDeviceTokens,
   insertNotification,
};
