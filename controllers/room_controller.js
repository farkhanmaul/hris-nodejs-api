const roomModel = require("../models/room_model");
const userModel = require("../models/user_model");
const notificationModel = require("../models/notification_model");
const notificationController = require("../controllers/notification_controller");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function roomBooking(req, res) {
   const { room_id, employee_id, pic_employee_id, date, start_time, end_time, meeting_topic, guest } = req.body;

   if (
      !validation.validateUserInput(room_id) ||
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(pic_employee_id) ||
      !validation.validateUserInput(date) ||
      !validation.validateUserInput(start_time) ||
      !validation.validateUserInput(end_time) ||
      !validation.validateUserInput(meeting_topic)
   ) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   const bookingDate = new Date(date);
   const dayOfWeek = bookingDate.getDay();

   // Check if the booking date is a Sunday
   if (dayOfWeek === 0) {
      response(HTTP_STATUS.BAD_REQUEST, "96", "Failed to make booking on sunday", {}, res, req);
      return;
   }

   try {
      const existingBookings = await roomModel.getBookingsByRoomAndDate(room_id, date);

      // Check if there are any existing bookings for the selected time
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

      // Retrieve guest device tokens
      let guestDeviceTokens = [];
      if (Array.isArray(guest) && guest.length > 0) {
         const guestIds = guest;
         guestDeviceTokens = await notificationModel.getGuestDeviceTokens(guestIds);
      }

      const bookerFullName = await userModel.getUserFullName(employee_id);
      const picFullName = await userModel.getUserFullName(pic_employee_id);
      const roomName = await roomModel.getRoomName(room_id);

      const dateNew = new Date(date);

      const formattedDate = validation.formatDate(dateNew);

      const insertedRow = await roomModel.insertRoomBooking(
         room_id,
         employee_id,
         pic_employee_id,
         date,
         start_time,
         end_time,
         meeting_topic,
         guest
      );

      const template_name = "room_booking";
      const dynamicNotification = await notificationModel.getDynamicNotificationData(template_name);

      const notificationTitle = dynamicNotification.msg_title;

      const variables = [
         "${date}",
         "${roomName}",
         "${bookerFullName}",
         "${picFullName}",
         "${formattedDate}",
         "${start_time}",
         "${end_time}",
         "${meeting_topic}",
      ];
      const values = [
         formattedDate,
         roomName,
         bookerFullName,
         picFullName,
         formattedDate,
         start_time,
         end_time,
         meeting_topic,
      ];

      let notificationBody = dynamicNotification.msg_body;

      variables.forEach((variable, index) => {
         if (notificationBody.includes(variable)) {
            notificationBody = notificationBody.replace(variable, values[index]);
         }
      });
      const notificationData = {
         booking_id: insertedRow.id.toString(),
         date: formattedDate,
         room_name: roomName,
         booker: bookerFullName,
         pic: picFullName,
         meeting_date: formattedDate,
         start_time: start_time,
         end_time: end_time,
         meeting_topic: meeting_topic,
      };

      // Send push notifications to guests with device tokens
      for (let i = 0; i < guestDeviceTokens.length; i++) {
         const deviceToken = guestDeviceTokens[i];
         const guestId = guest[i];
         await notificationController.sendPushNotification(
            deviceToken,
            notificationTitle,
            notificationBody,
            notificationData,
            guestId
         );
      }

      response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Room booking created successfully", {}, res, req);
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

async function getRoom(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await roomModel.getRoomData();

      if (!result) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, "No room found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Room data retrieved successfully", result, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve room data:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to retrieve room data",
         {},
         res,
         req
      );
   }
}

async function getEmployee(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await roomModel.getAllEmployees();

      if (!result || !result.recordset || !result.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, "No employees found", {}, res, req);
      } else {
         res.status(200).json({
            respCode: RESPONSE_CODES.SUCCESS,
            respMsg: "Employees retrieved successfully",
            data: result.recordset,
         });
      }
   } catch (error) {
      console.error("Failed to retrieve employees:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

async function getActiveBookingHandler(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const activeBookings = await roomModel.getActiveBookings(employee_id);
      if (!activeBookings || !activeBookings.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Active bookings retrieved successfully",
            activeBookings,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

async function getHistoryBooking(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const historyBookings = await roomModel.getHistoryBookings(employee_id);
      if (!historyBookings || !historyBookings.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "History bookings retrieved successfully",
            historyBookings,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

async function getDetailBookingHandler(req, res) {
   const { employee_id, booking_id } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(booking_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const detailBookings = await roomModel.getDetailBookings(booking_id);
      if (!detailBookings || !detailBookings.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Detail bookings retrieved successfully",
            detailBookings[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

async function getBookingByRoom(req, res) {
   const { employee_id, room_id, date } = req.body;
   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(room_id) ||
      !validation.validateUserInput(date)
   ) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const BookingByRoom = await roomModel.getBookingsByRoomAndDate(room_id, date);

      if (Object.keys(BookingByRoom).length === 0) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Active bookings retrieved successfully",
            BookingByRoom,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         RESPONSE_MESSAGES.SERVER_ERROR,
         {},
         res,
         req
      );
   }
}

module.exports = {
   roomBooking,
   getRoom,
   getEmployee,
   getActiveBookingHandler,
   getDetailBookingHandler,
   getHistoryBooking,
   getBookingByRoom,
};
