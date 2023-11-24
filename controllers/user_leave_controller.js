const userModel = require("../models/user_model");
const userLeaveModel = require("../models/user_leave_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function getLeavePlafonds(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userLeaveModel.getLeavePlafondData(employee_id);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         const lastUpdate = new Date(leaveData.recordset[0].LastUpdateSaldo);
         leaveData.recordset[0].LastUpdateSaldo = validation.formatDate(lastUpdate);
         response(HTTP_STATUS.OK, "00", "Leave data retrieved successfully", leaveData.recordset[0], res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeaveListApproved(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userLeaveModel.getLeaveApprove(employee_id);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Leave data retrieved successfully", leaveData.recordset, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeaveListNotApproved(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userLeaveModel.getLeaveNotApprove(employee_id);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Leave data retrieved successfully", leaveData.recordset, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeaveDetails(req, res) {
   const { employee_id, RequestFormId } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userLeaveModel.getLeaveDetailData(employee_id, RequestFormId);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Leave data retrieved successfully", leaveData.recordset[0], res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   getLeavePlafonds,
   getLeaveListApproved,
   getLeaveListNotApproved,
   getLeaveDetails,
};
