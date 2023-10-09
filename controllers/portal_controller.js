const userModel = require("../models/user_model");
const portalModel = require("../models/portal_model");
const userValidation = require("../utils/validation");
const verifyToken = require("../middleware/verify_token.js");
const response = require("../middleware/response");

// login endpoint
async function loginEmailWeb(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const result = await portalModel.getUserEmail(employee_id);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const { email } = result[0][0];
         const otp = userValidation.generateOTP();
         const expired_at = userValidation.generateExpirationDate();
         await portalModel.sendOTPbyEmailWeb(
            email,
            otp,
            expired_at,
            employee_id
         );
         response(
            200,
            "00",
            "Employee Found, OTP Sent to Email",
            { email: email },
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function verifyOTPweb(req, res) {
   const { employee_id, otp } = req.body;
   if (
      !userValidation.validateUserInput(employee_id) ||
      !userValidation.validateUserInput(otp)
   ) {
      response(400, "04", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const result = await portalModel.getUserOTPweb(employee_id);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_otp table
         response(404, "01", "Employee ID not found", {}, res, req);
      } else {
         const { otp: storedOTP, expired_at } = result[0][0];

         // Check if OTP is expired
         if (new Date() > new Date(expired_at)) {
            response(400, "02", "OTP has expired", {}, res, req);
         } else {
            // Verify the OTP (case-insensitive and ignore leading/trailing white spaces)
            if (otp === storedOTP) {
               // OTP is correct
               // Generate a random 30-digit string token
               const token = userValidation.generateRandomToken();

               // Generate the expiration date (3 months from the current date)
               const expirationDate = userValidation.generateExpirationDate();

               // Store the employee_id, token, and expiration date in the database
               await userModel.storeUserToken(
                  employee_id,
                  token,
                  expirationDate
               );

               response(
                  200,
                  "00",
                  "OTP verified",
                  { token, expirationDate },
                  res,
                  req
               );
            } else {
               // OTP is incorrect
               response(404, "03", "Invalid OTP", {}, res, req);
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify OTP:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   loginEmailWeb,
   verifyOTPweb,
};
