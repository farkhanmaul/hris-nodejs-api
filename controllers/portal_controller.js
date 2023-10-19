const userModel = require("../models/user_model");
const portalModel = require("../models/portal_model");
const userValidation = require("../utils/validation");
const {
   HTTP_STATUS,
   RESPONSE_CODES,
   RESPONSE_MESSAGES,
} = require("../utils/globals.js");
const verifyToken = require("../middleware/verify_token.js");
const response = require("../middleware/response");

// login endpoint
async function loginEmailWeb(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(
         HTTP_STATUS.BAD_REQUEST,
         "98",
         "Invalid user input",
         {},
         res,
         req
      );
      return;
   }

   try {
      const email = await userModel.getUserEmail(employee_id);

      if (!email) {
         response(HTTP_STATUS.NOT_FOUND, "01", "User not found", {}, res, req);
      } else {
         const otp = userValidation.generateOTP();
         const expired_at = userValidation.generateExpirationDate();
         await portalModel.sendOTPbyEmailWeb(
            email,
            otp,
            expired_at,
            employee_id
         );
         response(
            HTTP_STATUS.OK,
            "00",
            "Employee Found, OTP Sent to Email",
            { destination: email },
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         "99",
         "Internal Server Error",
         {},
         res,
         req
      );
   }
}

async function verifyOTPweb(req, res) {
   const { employee_id, otp } = req.body;
   if (
      !userValidation.validateUserInput(employee_id) ||
      !userValidation.validateUserInput(otp)
   ) {
      response(
         HTTP_STATUS.BAD_REQUEST,
         "98",
         "Invalid user input",
         {},
         res,
         req
      );
      return;
   }
   try {
      const result = await portalModel.getUserOTPweb(employee_id);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_otp table
         response(
            HTTP_STATUS.NOT_FOUND,
            "01",
            "Employee ID not found",
            {},
            res,
            req
         );
      } else {
         const { otp: storedOTP, expired_at } = result[0][0];

         // Check if OTP is expired
         if (new Date() > new Date(expired_at)) {
            response(
               HTTP_STATUS.FORBIDDEN,
               "02",
               "OTP has expired",
               {},
               res,
               req
            );
         } else {
            // Verify the OTP (case-insensitive and ignore leading/trailing white spaces)
            if (otp === storedOTP) {
               response(HTTP_STATUS.OK, "00", "OTP verified", {}, res, req);
            } else {
               // OTP is incorrect
               response(
                  HTTP_STATUS.NOT_FOUND,
                  "03",
                  "Data not found",
                  {},
                  res,
                  req
               );
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify OTP:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         "99",
         "Internal Server Error",
         {},
         res,
         req
      );
   }
}

module.exports = {
   loginEmailWeb,
   verifyOTPweb,
};
