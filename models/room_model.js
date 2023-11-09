const db1 = require("../config/database1");
const db2 = require("../config/database2");
const db3 = require("../config/database3");
const response = require("../middleware/response");

async function insertRoomBooking(
   room_id,
   booker_employee_id,
   pic_employee_id,
   start_time,
   end_time,
   datetime,
   meeting_topic
) {
   const query = `INSERT INTO room_booking (room_id, booker_employee_id, pic_employee_id, start_time, end_time, meeting_topic) 
                  VALUES (?, ?, ?, ?, ?, ?)`;
   const result = await db2.query(query, [
      room_id,
      booker_employee_id,
      pic_employee_id,
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
module.exports = { insertRoomBooking };
