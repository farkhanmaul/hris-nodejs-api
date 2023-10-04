const userModel = require("../models/user_model");
const userValidation = require("../utils/validation");
const verifyToken = require("../middleware/verify_token.js");
const response = require("../middleware/response");

// login endpoint
async function loginEmailWeb(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const email = await userModel.getUserEmail(employeeId);

      if (!email) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const otp = userValidation.generateOTP();
         const expiredAt = userValidation.generateExpirationDate();

         await userModel.sendOTPbyEmailWeb(email, otp, expiredAt, employeeId);

         response(
            200,
            "00",
            "Employee Found, OTP Sent to Email",
            { employeeEmail: email },
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
   const { employeeId, otp } = req.body;
   if (
      !userValidation.validateUserInput(employeeId) ||
      !userValidation.validateUserInput(otp)
   ) {
      response(400, "04", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const result = await userModel.getUserOTPweb(employeeId);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_otp table
         response(404, "01", "Employee ID not found", {}, res, req);
      } else {
         const { otp: storedOTP, expiredAt } = result[0][0];

         // Check if OTP is expired
         if (new Date() > new Date(expiredAt)) {
            response(400, "02", "OTP has expired", {}, res, req);
         } else {
            // Verify the OTP (case-insensitive and ignore leading/trailing white spaces)
            if (otp === storedOTP) {
               // OTP is correct
               // Generate a random 30-digit string token
               const token = userValidation.generateRandomToken();

               // Generate the expiration date (3 months from the current date)
               const expirationDate = userValidation.generateExpirationDate();

               // Store the employeeId, token, and expiration date in the database
               await userModel.storeUserToken(
                  employeeId,
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
