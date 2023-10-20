const portalModel = require("../models/portal_model");
const validation = require("../utils/validation");
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
   const isInputValid = validation.validateUserInput(employee_id);

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
      const email = await portalModel.getUserEmail(employee_id);

      if (!email) {
         response(HTTP_STATUS.NOT_FOUND, "01", "User not found", {}, res, req);
      } else {
         const otp = validation.generateOTP();
         const expired_at = validation.generateExpirationDate();
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

async function loginWAWeb(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isEmployeeIdValid = validation.validateUserInput(employee_id);

   if (!isEmployeeIdValid) {
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
      const result = await portalModel.getUserMobilePhones(employee_id);

      if (!result) {
         response(HTTP_STATUS.NOT_FOUND, "01", "User not found", {}, res, req);
      } else {
         const no_hp1 = result.MobilePhone1;
         const no_hp2 = result.MobilePhone2;

         // no hp tujuan
         let destination = "";

         if (no_hp1) {
            destination = no_hp1;
         } else if (no_hp2) {
            destination = no_hp2;
         } else {
            // Mobile phone not found
            response(
               HTTP_STATUS.NOT_FOUND,
               "02",
               "Mobile phone not found, Please Contact HRD.",
               {},
               res,
               req
            );
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
            message: `This message originated from ACA, \nThis is your OTP code : \n*${otp}* \nPlease do not share your OTP code to anyone. We never ask for your personal OTP code.`,
         };

         await portalModel.sendOTPbyWhatsApp(
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
            "00",
            "OTP Sent to WhatsApp",
            { destination: destination },
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to send OTP via WhatsApp:", error);
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
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(otp)
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
                  "OTP is incorrect",
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
   loginWAWeb,
};
