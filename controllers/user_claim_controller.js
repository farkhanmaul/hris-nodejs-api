const userModel = require("../models/user_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function getRequestCompleted(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestComp(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Request data retrieved successfully", requestData.recordset, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestRejected(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestReject(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Request data retrieved successfully", requestData.recordset, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestProgress(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestProg(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Request data retrieved successfully", requestData.recordset, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestDetail(req, res) {
   const { employee_id, RequestFormId } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestDet(employee_id, RequestFormId);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         response(HTTP_STATUS.OK, "00", "Request data retrieved successfully", requestData.recordset[0], res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getMedicalPlafonds(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      // Dummy response for plafonds
      const plafonds = {
         amount: "coming soon",
         expiredDate: "1 Jan 2023",
      };

      const { amount, expiredDate } = plafonds;

      const plafondsData = {
         amount,
         expiredDate,
      };

      response(HTTP_STATUS.OK, "00", "Plafonds retrieved successfully", plafondsData, res, req);
   } catch (error) {
      console.error("Failed to retrieve plafonds:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   getRequestCompleted,
   getRequestRejected,
   getRequestProgress,
   getRequestDetail,
   getMedicalPlafonds,
};
