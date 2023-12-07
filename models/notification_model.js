const db2 = require("../config/database2");
const validation = require("../utils/validation");

async function getNotificationData(employee_id) {
   const query = `
      SELECT id, msg_title, msg_body, is_read, created_at
      FROM notification_inbox
      WHERE employee_id = ?
      ORDER BY created_at DESC
   `;
   const result = await db2.query(query, [employee_id]);

   if (result.length > 0) {
      result[0].forEach((notification) => {
         const formattedDate = validation.formatDateToPastFormat(notification.created_at);

         notification.created_at = formattedDate;
      });
   }

   return result;
}

async function getUnreadNotificationCount(employee_id) {
   const query = `
      SELECT COUNT(*) AS unread_inbox
      FROM notification_inbox
      WHERE employee_id = ? AND is_read = false
   `;
   const result = await db2.query(query, [employee_id]);

   const unread_inbox = result[0][0].unread_inbox;
   return unread_inbox || null;
}

async function getSpecifyNotificationData(employee_id, notification_id) {
   const query = `
     SELECT id, msg_title, msg_body, msg_data, is_read, created_at
     FROM notification_inbox
     WHERE employee_id = ? AND id = ?
     ORDER BY created_at DESC
   `;
   const result = await db2.query(query, [employee_id, notification_id]);

   if (result.length > 0 && result[0].length > 0) {
      const notification = result[0][0];
      const formattedDate = validation.formatDateWithHour(notification.created_at);
      notification.created_at = formattedDate;

      const msgData = JSON.parse(notification.msg_data);
      if (msgData) {
         Object.assign(msgData, {
            booking_id: msgData.booking_id,
            date: msgData.date,
            room_name: msgData.room_name,
            booker: msgData.booker,
            pic: msgData.pic,
            meeting_date: msgData.meeting_date,
            start_time: msgData.start_time,
            end_time: msgData.end_time,
            meeting_topic: msgData.meeting_topic,
         });
      }

      notification.msg_data = msgData;
   }

   return result[0];
}

async function storeFirebaseToken(employee_id, firebaseToken) {
   const selectQuery = `SELECT COUNT(*) AS count FROM user_fbtoken WHERE employee_id = ?`;
   const updateQuery = `UPDATE user_fbtoken SET token = ?, updated_at = ?, is_active = true WHERE employee_id = ?`;
   const insertQuery = `INSERT INTO user_fbtoken (employee_id, token, created_at, is_active) VALUES (?, ?, ?, true)`;
   const date = new Date();

   const [rows] = await db2.query(selectQuery, [employee_id]);
   const count = rows[0].count;

   if (count > 0) {
      await db2.query(updateQuery, [firebaseToken, date, employee_id]);
   } else {
      await db2.query(insertQuery, [employee_id, firebaseToken, date]);
   }
}

async function getGuestDeviceTokens(guestIds) {
   try {
      const query = `SELECT token FROM user_fbtoken WHERE employee_id IN (?) AND is_active = true`;
      const [rows] = await db2.query(query, [guestIds]);
      const deviceTokens = rows.map((row) => row.token);
      return deviceTokens;
   } catch (error) {
      console.error("Error fetching guest device tokens:", error);
      throw new Error("Failed to fetch guest device tokens");
   }
}

async function insertNotification(employee_id, title, body, data) {
   const createdAt = new Date();
   const insertQuery = `
      INSERT INTO notification_inbox (employee_id, msg_title, msg_body, msg_data, is_read, created_at)
      VALUES (?, ?, ?, ?, false, ?)
   `;
   const result = await db2.query(insertQuery, [employee_id, title, body, JSON.stringify(data), createdAt]);
   const fetchQuery = `
      SELECT id FROM notification_inbox
      WHERE employee_id = ?
      ORDER BY created_at DESC
      LIMIT 1
   `;

   const fetchedResult = await db2.query(fetchQuery, [employee_id]);
   const newestId = fetchedResult[0][0].id.toString();
   return newestId;
}

async function markNotificationAsRead(notification_id) {
   const query = `
      UPDATE notification_inbox
      SET is_read = 1
      WHERE id = ?
   `;
   const result = await db2.query(query, [notification_id]);
   return result;
}

async function getDynamicNotificationData(templateName) {
   try {
      const query = "SELECT msg_title, msg_body FROM notification_template WHERE template_name = ? LIMIT 1;";
      const result = await db2.query(query, [templateName]);

      return result[0][0];
   } catch (error) {
      console.error("Error fetching dynamic notification data:", error);
      throw error;
   }
}

module.exports = {
   getNotificationData,
   getSpecifyNotificationData,
   getUnreadNotificationCount,
   getGuestDeviceTokens,
   storeFirebaseToken,
   insertNotification,
   markNotificationAsRead,
   getDynamicNotificationData,
};
