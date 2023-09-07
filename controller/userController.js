const userModel = require("../model/userModel");
const userValidation = require("../model/userValidation");

const response = require("../middleware/response");

// login endpoint
async function login(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "99", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const email = await userModel.getUserEmail(employeeId);

      if (!email) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const otp = userValidation.generateOTP();
         const expiredAt = userValidation.generateExpirationDate();

         await userModel.sendOTP(email, otp, expiredAt, employeeId);

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

async function loginOTP(req, res) {
   const { employeeId, otp } = req.body;

   try {
      const result = await userModel.getUserOTP(employeeId);

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

async function userProfile(req, res) {
   const { employeeId } = req.body;

   try {
      const result = await userModel.getUserProfile(employeeId);

      if (!result || !result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const profile = result.recordset[0];
         const birthDate = new Date(profile.BirthDate);
         const joinCompanyDate = new Date(profile.JoinCompany);

         profile.BirthDate = userValidation.formatDate(birthDate); // Format BirthDate
         profile.JoinCompany = userValidation.formatDate(joinCompanyDate); // Format JoinCompany

         // Add position, level, and status with (-) values
         profile.Position = "-";
         profile.Level = "-";
         profile.Work = "-";

         console.log(req.socket.remoteAddress);
         console.log(req.ip);
         const ipAddresses = req.header("x-forwarded-for");
         console.log(ipAddresses);

         response(
            200,
            "00",
            "Profile retrieved successfully",
            profile,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve user profile:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function logout(req, res) {
   const token = req.headers["x-api-key"];
   const { employeeId } = req.body;

   try {
      const result = await userModel.getTokenStatus(token);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(404, "01", "Token not found", {}, res, req);
      } else {
         const { status } = result[0][0];

         if (status === "closed") {
            response(400, "02", "Token is already closed", {}, res, req);
         } else {
            await userModel.closeToken(token);

            response(200, "00", "Logout successful", {}, res, req);
         }
      }
   } catch (error) {
      console.error("Failed to logout:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = { login, loginOTP, userProfile, logout };
