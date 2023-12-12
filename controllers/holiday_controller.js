const holidayCalendarModel = require("../models/holiday_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function getHolidayCalendar(req, res) {
   const { employee_id } = req.body;

   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const holidayCalendarData = await holidayCalendarModel.getHolidayCalendar();

      if (!holidayCalendarData) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Holiday calendar data retrieved successfully",
            holidayCalendarData,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve holiday calendar data:", error);
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
   getHolidayCalendar,
};
