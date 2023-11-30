const userClaimModel = require("../models/user_claim_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function getClaimCompleted(req, res) {
   const { employee_id } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const requestData = await userClaimModel.getRequestCompleted(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
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

async function getClaimRejected(req, res) {
   const { employee_id } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const requestData = await userClaimModel.getRequestReject(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
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

async function getClaimOnProgress(req, res) {
   const { employee_id } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const requestData = await userClaimModel.getRequestProgress(employee_id);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
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

async function getClaimDetail(req, res) {
   const { employee_id, RequestFormId } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const requestData = await userClaimModel.getRequestDetail(employee_id, RequestFormId);

      if (!requestData || !requestData.recordset || !requestData.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, {}, res, req);
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Request data retrieved successfully",
            requestData.recordset[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
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

async function getMedicalPlafonds(req, res) {
   const { employee_id } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      // Dummy response for plafonds
      const plafonds = {
         amount: "-",
         expiredDate: "-",
      };

      const { amount, expiredDate } = plafonds;

      const plafondsData = {
         amount,
         expiredDate,
      };

      response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Plafonds retrieved successfully", plafondsData, res, req);
   } catch (error) {
      console.error("Failed to retrieve plafonds:", error);
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
   getClaimCompleted,
   getClaimRejected,
   getClaimOnProgress,
   getClaimDetail,
   getMedicalPlafonds,
};
