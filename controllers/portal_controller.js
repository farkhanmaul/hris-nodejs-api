const portalModel = require("../models/portal_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function loginEmailPortal(req, res) {
   const { employee_id } = req.body;

   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const employeeExists = await portalModel.checkEmployeeExistence(employee_id);

      if (!employeeExists) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, "User does not have permission", {}, res, req);
      } else {
         const email = await portalModel.getUserEmail(employee_id);

         if (!email) {
            response(HTTP_STATUS.NOT_FOUND, "02", "User not found", {}, res, req);
         } else {
            const otp = validation.generateOTP();
            const expired_at = validation.generateExpirationDate();
            await portalModel.sendOTPbyEmailPortal(email, otp, expired_at, employee_id);
            response(
               HTTP_STATUS.OK,
               RESPONSE_CODES.SUCCESS,
               "Employee Found, OTP Sent to Email",
               { destination: email },
               res,
               req
            );
         }
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
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

async function loginWAPortal(req, res) {
   const { employee_id } = req.body;

   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const employeeExists = await portalModel.checkEmployeeExistence(employee_id);

      if (!employeeExists) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, "User does not have permission", {}, res, req);
      } else {
         const result = await portalModel.getUserMobilePhones(employee_id);

         if (!result) {
            response(HTTP_STATUS.NOT_FOUND, "02", "User not found", {}, res, req);
         } else {
            const no_hp1 = result.MobilePhone1;
            const no_hp2 = result.MobilePhone2;

            let destination = "";

            if (no_hp1) {
               destination = no_hp1;
            } else if (no_hp2) {
               destination = no_hp2;
            } else {
               response(HTTP_STATUS.NOT_FOUND, "03", "Mobile phone not found, Please Contact HRD.", {}, res, req);
               return;
            }

            const otp = validation.generateOTP();
            const expired_at = validation.generateExpirationDate();
            const created_at = new Date();
            const email = "";

            const headers = {
               Accept: "application/json",
               APIKey: process.env.WA_API_KEY,
            };
            const url = process.env.WA_URL;

            const data = {
               destination,
               message: `This message originated from Portal ACA, \nThis is your OTP code : \n*${otp}* \nPlease do not share your OTP code to anyone. We never ask for your personal OTP code.`,
            };

            await portalModel.sendOTPbyWhatsAppPortal(
               email,
               otp,
               expired_at,
               employee_id,
               created_at,
               destination,
               url,
               headers,
               data
            );

            response(
               HTTP_STATUS.OK,
               RESPONSE_CODES.SUCCESS,
               "OTP Sent to WhatsApp",
               { destination: destination },
               res,
               req
            );
         }
      }
   } catch (error) {
      console.error("Failed to send OTP via WhatsApp:", error);
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

async function verifyOTPportal(req, res) {
   const { employee_id, otp } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(otp)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await portalModel.getUserOTPportal(employee_id);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(HTTP_STATUS.NOT_FOUND, RESPONSE_CODES.NOT_FOUND, "Employee ID not found", {}, res, req);
      } else {
         const { otp: storedOTP, expired_at } = result[0][0];

         if (new Date() > new Date(expired_at)) {
            response(HTTP_STATUS.FORBIDDEN, "02", "OTP has expired", {}, res, req);
         } else {
            if (otp === storedOTP) {
               response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "OTP verified", {}, res, req);
            } else {
               response(HTTP_STATUS.NOT_FOUND, "03", "OTP is incorrect", {}, res, req);
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify OTP:", error);
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
   loginEmailPortal,
   loginWAPortal,
   verifyOTPportal,
};
