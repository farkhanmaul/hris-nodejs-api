const userModel = require("../models/user_model");
const roomModel = require("../models/room_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function roomBooking(req, res) {
   const { room_id, booker_employee_id, pic_employee_id, date, start_time, end_time, meeting_topic, guest } = req.body;

   const room_idValid = validation.validateUserInput(room_id);
   const booker_employee_idValid = validation.validateUserInput(booker_employee_id);
   const pic_employee_idValid = validation.validateUserInput(pic_employee_id);
   const dateValid = validation.validateUserInput(date);
   const start_timeValid = validation.validateUserInput(start_time);
   const end_timeValid = validation.validateUserInput(end_time);
   const meeting_topicValid = validation.validateUserInput(meeting_topic);

   if (
      !room_idValid ||
      !booker_employee_idValid ||
      !pic_employee_idValid ||
      !dateValid ||
      !start_timeValid ||
      !end_timeValid ||
      !meeting_topicValid
   ) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   const bookingDate = new Date(date);
   const dayOfWeek = bookingDate.getDay();

   // Check if the booking date is a weekend (Saturday or Sunday)
   if (dayOfWeek === 0) {
      response(HTTP_STATUS.BAD_REQUEST, "96", "Failed to make booking on weekends", {}, res, req);
      return;
   }

   try {
      const existingBookings = await roomModel.getBookingsByRoomAndDate(room_id, date);

      // Check if there are any existing bookings for the specified date
      if (existingBookings[date] && existingBookings[date].length > 0) {
         const overlappingBooking = existingBookings[date].find((booking) => {
            const bookingStartTime = new Date(`${date}T${booking.start_time}`);
            const bookingEndTime = new Date(`${date}T${booking.end_time}`);
            const newStartTime = new Date(`${date}T${start_time}`);
            const newEndTime = new Date(`${date}T${end_time}`);
            return (
               (newStartTime >= bookingStartTime && newStartTime < bookingEndTime) ||
               (newEndTime > bookingStartTime && newEndTime <= bookingEndTime) ||
               (newStartTime <= bookingStartTime && newEndTime >= bookingEndTime)
            );
         });

         if (overlappingBooking) {
            response(
               HTTP_STATUS.BAD_REQUEST,
               "97",
               "Room is already booked for the specified date and time interval",
               {},
               res,
               req
            );
            return;
         }
      }

      const insertedRow = await roomModel.insertRoomBooking(
         room_id,
         booker_employee_id,
         pic_employee_id,
         date,
         start_time,
         end_time,
         meeting_topic,
         guest
      );

      response(HTTP_STATUS.OK, "00", "Room booking created successfully", insertedRow, res, req);
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRoom(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }
   try {
      const result = await roomModel.getRoomData();

      if (!result) {
         response(HTTP_STATUS.NOT_FOUND, "01", "No room found with the specified ID", null, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Room data retrieved successfully", result, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve room data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Failed to retrieve room data", null, res, req);
   }
}

async function getEmployee(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }
   try {
      const result = await roomModel.getAllEmployees();

      if (!result || !result.recordset || !result.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "No employees found", {}, res, req);
      } else {
         // const data = result.recordset.map((employee) => Object.values(employee));
         // response(HTTP_STATUS.OK, "00", "Employees retrieved successfully", result.recordset, res, req);
         res.status(200).json({
            respCode: "00",
            respMsg: "Employees retrieved successfully",
            data: result.recordset,
         });
      }
   } catch (error) {
      console.error("Failed to retrieve employees:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getActiveBooking(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }
   try {
      const activeBookings = await roomModel.getActiveBookings(employee_id);
      if (!activeBookings || !activeBookings.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Active bookings retrieved successfully", activeBookings, res, req);
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getHistoryBooking(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }
   try {
      const historyBookings = await roomModel.getHistoryBookings(employee_id);
      if (!historyBookings || !historyBookings.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "History bookings retrieved successfully", historyBookings, res, req);
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getBookingByRoom(req, res) {
   const { employee_id, room_id, date } = req.body;
   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(room_id) ||
      !validation.validateUserInput(date)
   ) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }

   try {
      const BookingByRoom = await roomModel.getBookingsByRoomAndDate(room_id, date);

      if (Object.keys(BookingByRoom).length === 0) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Active bookings retrieved successfully", BookingByRoom, res, req);
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = { roomBooking, getRoom, getEmployee, getActiveBooking, getHistoryBooking, getBookingByRoom };
