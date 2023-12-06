const db1 = require("../config/database1");
const db2 = require("../config/database2");
const validation = require("../utils/validation");
const userModel = require("../models/user_model");

async function insertRoomBooking(
   room_id,
   booker_employee_id,
   pic_employee_id,
   date,
   start_time,
   end_time,
   meeting_topic,
   guest
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
   const bookingId = fetchedResult[0][0].id;

   // Insert guest data into room_booking_guest table
   if (Array.isArray(guest) && guest.length > 0) {
      const guestValues = guest.map((employee_id) => [employee_id, bookingId]);
      const guestQuery = `INSERT INTO room_booking_guest (employee_id, booking_id) VALUES ?`;
      await db2.query(guestQuery, [guestValues]);
   }
   // Return the inserted row's data
   return fetchedResult[0][0];
}

async function getRoomData() {
   const query = `
      SELECT id, room_name, capacity, location, room_image, floor_location, projector, microphone, whiteboard, webcam, availability, additional_notes
      FROM room_header
      ORDER BY capacity DESC
   `;
   const result = await db2.query(query);
   return result[0];
}

async function getRoomName(room_id) {
   const query = `
      SELECT room_name
      FROM room_header
      WHERE id = ?
   `;
   const result = await db2.query(query, [room_id]);

   if (result[0].length > 0) {
      return result[0][0].room_name;
   } else {
      return "Unknown Room";
   }
}

async function getAllEmployees() {
   try {
      const query = `
      SELECT 
         ROW_NUMBER() OVER (ORDER BY e.EmployeeFullName) AS id,
         e.EmployeeId, 
         e.EmployeeFullName,
         j.JobTitleLabel
      FROM 
         dbo.HrEmployee e
         INNER JOIN dbo.HrEmploymentHistory eh ON e.EmployeeId = eh.EmployeeId
         INNER JOIN dbo.HrReferenceJobTitle j ON eh.JobTitleId = j.JobTitleId
      WHERE 
         e.IsExists = '1'
         AND eh.IsExists = '1'
      ORDER BY e.EmployeeFullName;
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
      currentDatetime.setHours(0, 0, 0, 0);
      const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

      // Retrieve active bookings for the specified employee ID from the database
      const query = `
        SELECT 
          rb.id, 
          rb.date, 
          TIME_FORMAT(rb.start_time, '%H:%i') AS start_time, 
          TIME_FORMAT(rb.end_time, '%H:%i') AS end_time, 
          rb.meeting_topic, 
          rh.room_name, 
          rh.location,
          (
            SELECT COUNT(employee_id)
            FROM room_booking_guest
            WHERE booking_id = rb.id
          ) AS guest_amount
        FROM 
          room_booking rb
          INNER JOIN room_header rh ON rb.room_id = rh.id
        WHERE 
          (rb.booker_employee_id = ? OR rb.pic_employee_id = ? OR rb.id IN (
            SELECT booking_id
            FROM room_booking_guest
            WHERE employee_id = ?
          )) 
          AND (
            (rb.date > CURRENT_DATE)
            OR (
                rb.date = CURRENT_DATE 
                AND rb.end_time > CURRENT_TIME
            )
         )
        ORDER BY rb.date ASC, rb.start_time ASC
      `;

      const activeBookings = await db2.query(query, [
         employee_id,
         employee_id,
         employee_id,
         currentDatetime,
         currentTime,
      ]);

      const formattedBookings = [];
      for (const booking of activeBookings[0]) {
         const formattedDate = validation.formatDate(new Date(booking.date));

         formattedBookings.push({
            ...booking,
            date: formattedDate,
         });
      }

      return formattedBookings;
   } catch (error) {
      throw error;
   }
}

async function getHistoryBookings(employee_id) {
   try {
      const currentDatetime = new Date();
      currentDatetime.setHours(0, 0, 0, 0);
      const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

      // Retrieve past bookings for the specified employee ID from the database
      const query = `
      SELECT 
         rb.id, 
         rb.date, 
         TIME_FORMAT(rb.start_time, '%H:%i') AS start_time, 
         TIME_FORMAT(rb.end_time, '%H:%i') AS end_time, 
         rb.meeting_topic, 
         rh.room_name, 
         rh.location,
         (
            SELECT COUNT(employee_id)
            FROM room_booking_guest
            WHERE booking_id = rb.id
         ) AS guest_amount
      FROM 
         room_booking rb
         INNER JOIN room_header rh ON rb.room_id = rh.id
      WHERE (rb.booker_employee_id = ? OR rb.pic_employee_id = ? OR rb.id IN (
         SELECT booking_id
         FROM room_booking_guest
         WHERE employee_id = ?
      )) AND (
         (rb.date < CURRENT_DATE)
         OR (
            rb.date = CURRENT_DATE 
            AND rb.start_time < CURRENT_TIME
         )
      )
      ORDER BY rb.date DESC, rb.start_time ASC
    `;
      const pastBookings = await db2.query(query, [
         employee_id,
         employee_id,
         employee_id,
         currentDatetime,
         currentTime,
      ]);

      // Format each booking individually
      const formattedBookings = [];
      for (const booking of pastBookings[0]) {
         const formattedDate = validation.formatDate(new Date(booking.date));

         formattedBookings.push({
            ...booking,
            date: formattedDate,
         });
      }

      return formattedBookings;
   } catch (error) {
      throw error;
   }
}

async function getDetailBookings(booking_id) {
   try {
      // Retrieve the booking details for the specified booking ID from the database
      const query = `
        SELECT 
          rb.id, 
          rb.room_id, 
          rb.booker_employee_id, 
          rb.pic_employee_id, 
          rb.date, 
          TIME_FORMAT(rb.start_time, '%H:%i') AS start_time, 
          TIME_FORMAT(rb.end_time, '%H:%i') AS end_time, 
          rb.created_at,
          rb.meeting_topic, 
          rh.room_name, 
          rh.location,
          (
            SELECT GROUP_CONCAT(employee_id SEPARATOR ', ')
            FROM room_booking_guest
            WHERE booking_id = rb.id
          ) AS guest_ids
        FROM 
          room_booking rb
          INNER JOIN room_header rh ON rb.room_id = rh.id
        WHERE 
          rb.id = ?  
        ORDER BY rb.date ASC, rb.start_time ASC
      `;

      const activeBookings = await db2.query(query, [
         booking_id, // Pass the booking_id parameter to the query
      ]);

      // Convert the date to the desired format for each booking
      const formattedBookings = [];

      for (const booking of activeBookings[0]) {
         const formattedDate = validation.formatDate(new Date(booking.date));
         const formattedCreatedAt = validation.formatDateWithHour(new Date(booking.created_at));

         const bookerFullName = await userModel.getUserFullName(booking.booker_employee_id);
         const picFullName = await userModel.getUserFullName(booking.pic_employee_id);

         // Convert guest IDs to guest full names
         const guestIds = booking.guest_ids ? booking.guest_ids.split(", ") : [];
         const guestFullNames = [];

         for (const guestId of guestIds) {
            const guestFullName = await userModel.getUserFullName(guestId);
            guestFullNames.push(guestFullName);
         }

         const formattedBooking = {
            ...booking,
            date: formattedDate,
            created_at: formattedCreatedAt,
            booker_employee_fullname: bookerFullName,
            pic_employee_fullname: picFullName,
            guest_fullnames: guestFullNames,
         };

         formattedBookings.push(formattedBooking);
      }

      return formattedBookings;
   } catch (error) {
      throw error;
   }
}

async function getBookingsByRoomAndDate(room_id, date) {
   try {
      const query = `
      SELECT rh.room_name, rb.pic_employee_id, TIME_FORMAT(rb.start_time, '%H:%i') AS start_time, TIME_FORMAT(rb.end_time, '%H:%i') AS end_time, rb.meeting_topic
      FROM room_booking rb
      JOIN room_header rh ON rh.id = rb.room_id
      WHERE rb.room_id = ? AND rb.date = ?
      ORDER BY rb.date ASC, rb.start_time ASC
      `;
      const bookings = await db2.query(query, [room_id, date]);

      const transformedBookings = {};

      for (const booking of bookings[0]) {
         const employeeFullNames = await userModel.getUserFullName(booking.pic_employee_id);

         if (!transformedBookings[date]) {
            transformedBookings[date] = [];
         }

         transformedBookings[date].push({
            room_name: booking.room_name,
            meeting_topic: booking.meeting_topic,
            start_time: booking.start_time,
            end_time: booking.end_time,
            pic_employee_fullname: employeeFullNames,
         });
      }

      return transformedBookings;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   insertRoomBooking,
   getRoomData,
   getAllEmployees,
   getActiveBookings,
   getHistoryBookings,
   getDetailBookings,
   getBookingsByRoomAndDate,
   getRoomName,
};
