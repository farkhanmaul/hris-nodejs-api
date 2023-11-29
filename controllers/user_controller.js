const userModel = require("../models/user_model");
const globalModel = require("../models/global_model");
const notificationModel = require("../models/notification_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const verifyToken = require("../middleware/verify_token.js");
const response = require("../middleware/response");

// login endpoint
async function loginEmail(req, res) {
   const { employee_id } = req.body;

   const isEmployeeIdValid = validation.validateUserInput(employee_id);

   if (!isEmployeeIdValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const email = await userModel.getUserEmail(employee_id);

      if (!email) {
         response(HTTP_STATUS.NOT_FOUND, "01", "User not found", {}, res, req);
      } else {
         const otp = validation.generateOTP();
         const expired_at = validation.generateExpirationDate();

         await userModel.sendOTPbyEmail(email, otp, expired_at, employee_id);

         response(HTTP_STATUS.OK, "00", "Employee Found, OTP Sent to Email", { destination: email }, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function loginWA(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isEmployeeIdValid = validation.validateUserInput(employee_id);

   if (!isEmployeeIdValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const result = await userModel.getUserMobilePhones(employee_id);

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
            response(HTTP_STATUS.NOT_FOUND, "02", "Mobile phone not found, Please Contact HRD.", {}, res, req);
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
            message: `This message originated from ACA Mobile, \nThis is your OTP code : \n*${otp}* \nPlease do not share your OTP code to anyone. We never ask for your personal OTP code.`,
         };

         await userModel.sendOTPbyWhatsApp(
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

         response(HTTP_STATUS.OK, "00", "OTP Sent to WhatsApp", { destination: destination }, res, req);
      }
   } catch (error) {
      console.error("Failed to send OTP via WhatsApp:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function logout(req, res) {
   const token = req.headers["x-api-key"];

   const { employee_id } = req.body;
   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const result = await userModel.getTokenStatus(token);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Token not found", {}, res, req);
      } else {
         const { status } = result[0][0];

         if (status === "closed") {
            response(HTTP_STATUS.FORBIDDEN, "02", "Token is already closed", {}, res, req);
         } else {
            await userModel.closeToken(token);
            response(HTTP_STATUS.OK, "00", "Logout successful", {}, res, req);
         }
      }
   } catch (error) {
      console.error("Failed to logout:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function verifyOTP(req, res) {
   const { employee_id, otp } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(otp)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const result = await userModel.getUserOTP(employee_id);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_otp table
         response(HTTP_STATUS.NOT_FOUND, "01", "Employee ID not found", {}, res, req);
      } else {
         const { otp: storedOTP, expired_at } = result[0][0];

         // Check if OTP is expired
         if (new Date() > new Date(expired_at)) {
            response(HTTP_STATUS.FORBIDDEN, "02", "OTP has expired", {}, res, req);
         } else {
            // Verify the OTP (case-insensitive and ignore leading/trailing white spaces)
            if (otp === storedOTP) {
               // OTP is correct
               // Generate a random 30-digit string token
               const token = validation.generateRandomToken();

               // Generate the expiration date (3 months from the current date)
               const expirationDate = validation.generateExpirationDate();

               // Store the employee_id, token, and expiration date in the database
               await userModel.insertUserToken(employee_id, token, expirationDate);

               // Store the Firebase token in the user_fbtoken table
               const { fbtoken } = req.body;
               if (fbtoken) {
                  await notificationModel.storeFirebaseToken(employee_id, fbtoken);
               }
               const { device_id } = req.body;
               if (device_id) {
                  await userModel.insertUserDeviceId(employee_id, device_id);
               }
               response(HTTP_STATUS.OK, "00", "OTP verified", { token }, res, req);
            } else {
               // OTP is incorrect
               response(HTTP_STATUS.NOT_FOUND, "03", "OTP is incorrect", {}, res, req);
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify OTP:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function verifyTokenHandler(req, res, next) {
   try {
      await verifyToken(req, res); // Pass req, res, and next as separate arguments
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getProfile(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const result = await userModel.getUserProfile(employee_id);

      if (!result || !result.recordset || !result.recordset.length) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         const profile = result.recordset[0];
         const birthDate = new Date(profile.BirthDate);
         const joinCompanyDate = new Date(profile.JoinCompany);
         const currentDate = new Date();

         // Calculate working period
         const diffInTime = currentDate.getTime() - joinCompanyDate.getTime();
         const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
         const workingPeriod = {
            years: Math.floor(diffInDays / 365),
            months: Math.floor((diffInDays % 365) / 30),
            days: diffInDays % 30,
         };
         profile.workingPeriod = workingPeriod;
         profile.BirthDate = validation.formatDate(birthDate); // Format BirthDate
         profile.JoinCompany = validation.formatDate(joinCompanyDate); // Format JoinCompany

         response(HTTP_STATUS.OK, "00", "Profile retrieved successfully", profile, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve user profile:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getVersion(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      // Get the global variable  values
      const apiVersion = "version";
      const version = await globalModel.specificSelectGlobalVariables(apiVersion);

      const responsePayload = {
         version: version.value,
      };

      response(HTTP_STATUS.OK, "00", "Version data retrieved successfully", responsePayload, res, req);
   } catch (error) {
      console.error("Failed to retrieve version:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Failed to retrieve version", {}, res, req);
   }
}

module.exports = {
   loginEmail,
   loginWA,
   logout,
   verifyOTP,
   verifyTokenHandler,
   getProfile,
   getVersion,
};
