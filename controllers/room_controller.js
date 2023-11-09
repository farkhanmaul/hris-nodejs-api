const userModel = require("../models/user_model");
const roomModel = require("../models/room_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function roomBooking(req, res) {
   const { room_id, booker_employee_id, pic_employee_id, start_time, end_time, meeting_topic } = req.body;
   // Validate room_id, booker_employee_id, pic_employee_id, start_time, end_time, and meeting_topic
   const room_idValid = validation.validateUserInput(room_id);
   const booker_employee_idValid = validation.validateUserInput(booker_employee_id);
   const pic_employee_idValid = validation.validateUserInput(pic_employee_id);
   const start_timeValid = validation.validateUserInput(start_time);
   const end_timeValid = validation.validateUserInput(end_time);
   const meeting_topicValid = validation.validateUserInput(meeting_topic);

   if (!room_idValid || !booker_employee_idValid || !start_timeValid || !end_timeValid || !meeting_topicValid) {
      // Handle the case where any of the user inputs are potentially malicious
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Return early to prevent further processing
   }

   try {
      const datetime = new Date();

      // Insert the room booking record into the database
      const insertedRow = await roomModel.insertRoomBooking(
         room_id,
         booker_employee_id,
         pic_employee_id,
         start_time,
         end_time,
         datetime,
         meeting_topic
      );

      // Send the success response with the inserted row's data
      response(HTTP_STATUS.OK, "00", "Room booking created successfully", {}, res, req);
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = { roomBooking };
