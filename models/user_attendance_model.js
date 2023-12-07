const db2 = require("../config/database2");

async function recordEmployeePresence(
   employee_id,
   longitude,
   altitude,
   latitude,
   datetime,
   location_name,
   action,
   notes
) {
   const query = `INSERT INTO user_attendance (employee_id, longitude, altitude, latitude, datetime, location_name, action, notes) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   const result = await db2.query(query, [
      employee_id,
      longitude,
      altitude,
      latitude,
      datetime,
      location_name,
      action,
      notes,
   ]);

   const fetchQuery = `SELECT id FROM user_attendance WHERE employee_id = ? AND action = ? ORDER BY id DESC LIMIT 1`;
   const fetchedResult = await db2.query(fetchQuery, [employee_id, action]);

   return fetchedResult[0][0];
}

async function getPresenceData(employee_id, date) {
   const query = `SELECT employee_id, longitude, altitude, latitude, datetime, location_name, action, notes FROM user_attendance WHERE employee_id = ? AND DATE(datetime) = ? ORDER BY datetime DESC`;
   const result = await db2.query(query, [employee_id, date]);
   return result[0];
}

async function getClockTimeData(employee_id, date, action) {
   const query = `
      SELECT DATE_FORMAT(datetime, '%H:%i') AS clockTime, action, DATE(datetime) AS clockDate
      FROM user_attendance
      WHERE employee_id = ? AND DATE(datetime) = ? AND action = ?
      ORDER BY datetime DESC
      LIMIT 1
   `;
   const result = await db2.query(query, [employee_id, date, action]);
   return result[0];
}

async function getHistoryAttendanceData(employee_id, start_date, end_date) {
   const query = `SELECT employee_id, datetime, action FROM user_attendance WHERE employee_id = ? AND datetime >= ? AND datetime <= ? ORDER BY datetime DESC`;
   const result = await db2.query(query, [employee_id, start_date, end_date]);
   return result[0];
}

async function getAttendanceTimeRangeByTime(current_time) {
   try {
      const query = `
       SELECT range_name, start_time, end_time
       FROM attendance_time_range
       WHERE ? >= start_time AND ? <= end_time
     `;
      const result = await db2.query(query, [current_time, current_time]);

      return result[0].length > 0 ? result[0][0] : null;
   } catch (error) {
      console.error("Failed to retrieve attendance time range:", error);
      throw error;
   }
}

async function getLastAttendance(employee_id) {
   try {
      const query = `SELECT action FROM user_attendance WHERE employee_id = ? ORDER BY datetime DESC LIMIT 1`;
      const result = await db2.query(query, [employee_id]);

      if (result && result[0] && result[0][0]) {
         return result[0][0];
      } else {
         return "undefined";
      }
   } catch (error) {
      console.error("Error:", error);
      return null;
   }
}

async function getWorkingHour() {
   try {
      const query = `
       SELECT range_name, start_time, end_time
       FROM attendance_time_range
       WHERE range_name="Work Time"
     `;
      const result = await db2.query(query);

      return result[0].length > 0 ? result[0][0] : null;
   } catch (error) {
      console.error("Failed to retrieve attendance time range:", error);
      throw error;
   }
}

function calculateDuration(clockIn, clockOut) {
   // Check if both clock in and clock out times are available
   if (clockIn && clockOut) {
      const clockInTime = new Date(clockIn.datetime);
      const clockOutTime = new Date(clockOut.datetime);
      const durationMilliseconds = clockOutTime - clockInTime;
      const durationMinutes = Math.floor(durationMilliseconds / (1000 * 60));
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours}h ${minutes}m`;
   }

   return `0h 0m`;
}

async function insertEmployeePhoto(employee_id, photo, id) {
   const query = `UPDATE user_attendance SET photo = ? WHERE employee_id = ? AND id = ?`;
   await db2.query(query, [photo, employee_id, id]);
}

module.exports = {
   recordEmployeePresence,
   getPresenceData,
   getClockTimeData,
   getHistoryAttendanceData,
   getAttendanceTimeRangeByTime,
   getLastAttendance,
   getWorkingHour,
   calculateDuration,
   insertEmployeePhoto,
};
