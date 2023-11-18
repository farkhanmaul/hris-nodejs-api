const db1 = require("../config/database1");
const db2 = require("../config/database2");
const db3 = require("../config/database3");
const response = require("../middleware/response");

async function insertRoomBooking(
   room_id,
   booker_employee_id,
   pic_employee_id,
   date,
   start_time,
   end_time,
   datetime,
   meeting_topic
) {
   const query = `INSERT INTO room_booking (room_id, booker_employee_id, pic_employee_id, date, start_time, end_time, meeting_topic) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
   const result = await db2.query(query, [
      room_id,
      booker_employee_id,
      pic_employee_id,
      date,
      start_time,
      end_time,
      meeting_topic,
   ]);

   // Fetch the inserted row from the database using the room_booking_id
   const fetchQuery = `SELECT id FROM room_booking WHERE room_id = ? AND booker_employee_id = ? AND start_time = ? ORDER BY id DESC LIMIT 1`;
   const fetchedResult = await db2.query(fetchQuery, [room_id, booker_employee_id, start_time]);
   // Return the inserted row's data
   return fetchedResult[0][0];
}

async function getRoomData() {
   const query = `
      SELECT id, room_name, capacity, location, room_image, floor_location, projector, microphone, whiteboard, webcam, availability, additional_notes
      FROM room_header
   `;
   const result = await db2.query(query);
   return result[0];
}

async function getAllEmployees() {
   try {
      const query = `
      SELECT 
      e.EmployeeId, e.EmployeeFullName,
      j.JobTitleLabel
   FROM 
      dbo.HrEmployee e
      INNER JOIN dbo.HrEmploymentHistory eh ON e.EmployeeId = eh.EmployeeId
      INNER JOIN dbo.HrReferenceJobTitle j ON eh.JobTitleId = j.JobTitleId
      WHERE 
      eh.IsExists = '1';
      `;

      const result = await db1(query);
      return result;
   } catch (error) {
      throw error;
   }
}

async function getActiveBookings(employee_id) {
   try {
      const currentDatetime = new Date();

      // Retrieve active bookings for the specified employee ID from the database
      const query = `SELECT * FROM room_booking WHERE booker_employee_id = ? AND end_time > ?`;
      const activeBookings = await db2.query(query, [employee_id, currentDatetime]);

      return activeBookings;
   } catch (error) {
      throw error;
   }
}

async function getHistoryBookings(employee_id) {
   try {
      const currentDatetime = new Date();

      // Retrieve past bookings for the specified employee ID from the database
      const query = `SELECT * FROM room_booking WHERE booker_employee_id = ? AND end_time <= ?`;
      const pastBookings = await db2.query(query, [employee_id, currentDatetime]);

      return pastBookings;
   } catch (error) {
      throw error;
   }
}

module.exports = { insertRoomBooking, getRoomData, getAllEmployees, getActiveBookings, getHistoryBookings };
