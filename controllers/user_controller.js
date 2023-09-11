const userModel = require("../models/user_model");
const userValidation = require("../models/user_validation");

const verifyToken = require("../middlewares/verify_token.js");
const response = require("../middlewares/response");

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

async function attendance(req, res) {
   const {
      employeeId,
      longitude,
      altitude,
      latitude,
      locationName,
      action,
      notes,
   } = req.body;

   // Define default values for longitude, altitude, and latitude
   const defaultLongitude = 0;
   const defaultAltitude = 0;
   const defaultLatitude = 0;

   try {
      const datetime = new Date(); // Generate the current datetime

      await userModel.recordEmployeePresence(
         employeeId,
         longitude || defaultLongitude,
         altitude || defaultAltitude,
         latitude || defaultLatitude,
         datetime,
         locationName,
         action,
         notes
      );

      // Check if any of longitude, altitude, and latitude are set to defaults
      if (
         longitude === defaultLongitude ||
         altitude === defaultAltitude ||
         latitude === defaultLatitude
      ) {
         // Create a separate response for default values
         response(
            200,
            "01",
            "Employee presence recorded with default location",
            {},
            res,
            req
         );
      } else {
         // Send the regular success response
         response(
            200,
            "00",
            "Employee presence recorded successfully",
            {},
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to record employee presence:", error);
      response(500, "99", "Failed to record employee presence", {}, res, req);
   }
}

async function getAttendance(req, res) {
   const { employeeId, date } = req.body;

   try {
      const result = await userModel.getPresenceData(employeeId, date);

      if (!result || result.length === 0) {
         response(
            404,
            "01",
            "No presence data found for the specified date",
            {},
            res,
            req
         );
      } else {
         const attendanceData = result.map((row) => {
            const datetime = new Date(row.datetime);
            const dayName = datetime.toLocaleDateString("en-US", {
               weekday: "long",
            });
            const formattedDate = datetime.toLocaleDateString("en-US", {
               day: "numeric",
               month: "long",
            });
            const formattedTime = datetime.toLocaleTimeString("en-US", {
               hour: "numeric",
               minute: "numeric",
               hour12: false,
            });

            return {
               ...row,
               dayName,
               formattedDate,
               formattedTime,
            };
         });

         response(
            200,
            "00",
            "Presence data retrieved successfully",
            attendanceData,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve presence data:", error);
      response(500, "99", "Failed to retrieve presence data", {}, res, req);
   }
}

async function getClockTime(req, res) {
   const { employeeId, date, action } = req.body;

   try {
      const result = await userModel.getClockTimeData(employeeId, date, action);

      if (!result || result.length === 0) {
         response(
            404,
            "01",
            "No clock data found for the specified date and action",
            { hasClockToday: false },
            res,
            req
         );
      } else {
         const clockTime = result[0].clockTime;
         const clockDate = new Date(result[0].clockDate).toLocaleDateString(
            "id-ID",
            {
               day: "numeric",
               month: "long",
               year: "numeric",
            }
         );

         const action = result[0].action;
         response(
            200,
            "00",
            "Clock time retrieved successfully",
            {
               clockTime,
               clockDate,
               action,
               hasClockToday: true,
            },
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve clock time:", error);
      response(
         500,
         "99",
         "Failed to retrieve clock time",
         { hasClockToday: false },
         res,
         req
      );
   }
}

async function verifyTokenHandler(req, res, next) {
   try {
      await verifyToken(req, res); // Pass req, res, and next as separate arguments
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function login2(req, res) {
   const { employeeId } = req.body;

   try {
      const result = await userModel.getUserMobilePhones(employeeId);

      console.log(result);

      if (!result) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const mobilePhone1 = result.MobilePhone1;
         const mobilePhone2 = result.MobilePhone2;

         let destination = "";

         if (mobilePhone1) {
            destination = mobilePhone1;
         } else if (mobilePhone2) {
            destination = mobilePhone2;
         } else {
            // Mobile phone not found
            response(404, "02", "Mobile phone not found", {}, res, req);
            return;
         }

         const otp = userValidation.generateOTP();
         const expiredAt = userValidation.generateExpirationDate(); // Get the expiration datetime
         const createdAt = new Date(); // Get the current datetime

         // Insert data into user_otp table
         await userModel.storeOTP(
            destination,
            otp,
            expiredAt,
            employeeId,
            createdAt
         );

         // Send WhatsApp message
         const headers = {
            Accept: "application/json",
            APIKey: process.env.WA_API_KEY, // belom ada
         };
         const data = {
            destination,
            message: `Gunakan OTP ${otp} untuk login akun ACA Anda. OTP akan kadaluarsa dalam waktu 5 menit.`, // Customize the message content as desired
         };
         const url = "https://api.nusasms.com/nusasms_api/1.0/whatsapp/message";

         userModel.sendWhatsAppMessage(url, data, headers, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve user mobile phone:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   login2,
   verifyTokenHandler,
   getClockTime,
   getAttendance,
   attendance,
   login,
   loginOTP,
   userProfile,
   logout,
};
