const userModel = require("../models/user_model");
const userValidation = require("../models/user_validation");

const verifyToken = require("../middlewares/verify_token.js");
const response = require("../middlewares/response");

// login endpoint
async function loginEmail(req, res) {
   const { employeeId, deviceId } = req.body;

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

         await userModel.sendOTPbyEmail(
            email,
            otp,
            expiredAt,
            employeeId,
            deviceId
         );

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
async function loginWA(req, res) {
   const { employeeId, deviceId } = req.body;
   // Validate the user input
   const isEmployeeIdValid = userValidation.validateUserInput(employeeId);
   const isDeviceIdValid = userValidation.validateUserInput(deviceId);

   if (!isEmployeeIdValid || !isDeviceIdValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const result = await userModel.getUserMobilePhones(employeeId);

      if (!result) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const mobilePhone1 = result.MobilePhone1;
         const mobilePhone2 = result.MobilePhone2;

         // no hp tujuan
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
         const expiredAt = userValidation.generateExpirationDate();
         const createdAt = new Date();
         const email = "none";

         const headers = {
            Accept: "application/json",
            APIKey: process.env.WA_API_KEY,
         };
         const url = process.env.WA_URL;

         const data = {
            destination,
            message: `This message originated from ACA, \nThis is your OTP code : \n*${otp}* \nPlease do not share your OTP code to anyone. We never ask for your personal OTP code.`,
         };

         await userModel.sendOTPbyWhatsApp(
            email,
            otp,
            expiredAt,
            employeeId,
            createdAt,
            destination,
            deviceId,
            url,
            headers,
            data
         );

         response(200, "00", "OTP Sent to WhatsApp", {}, res, req);
      }
   } catch (error) {
      console.error("Failed to send OTP via WhatsApp:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function logout(req, res) {
   const token = req.headers["x-api-key"];

   const { employeeId } = req.body;
   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }
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

async function verifyOTP(req, res) {
   const { employeeId, otp } = req.body;
   if (
      !userValidation.validateUserInput(employeeId) ||
      !userValidation.validateUserInput(otp)
   ) {
      response(400, "04", "Invalid user input", {}, res, req);
      return;
   }
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

async function verifyTokenHandler(req, res, next) {
   try {
      await verifyToken(req, res); // Pass req, res, and next as separate arguments
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getProfile(req, res) {
   const { employeeId } = req.body;
   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const result = await userModel.getUserProfile(employeeId);

      if (!result || !result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res, req);
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
         profile.BirthDate = userValidation.formatDate(birthDate); // Format BirthDate
         profile.JoinCompany = userValidation.formatDate(joinCompanyDate); // Format JoinCompany

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
   // Validate employeeId, longitude, altitude, latitude, locationName, action, and notes
   const employeeIdValid = userValidation.validateUserInput(employeeId);
   const longitudeValid = userValidation.validateUserInput(longitude);
   const altitudeValid = userValidation.validateUserInput(altitude);
   const latitudeValid = userValidation.validateUserInput(latitude);
   const locationNameValid = userValidation.validateUserInput(locationName);
   const actionValid = userValidation.validateUserInput(action);
   const notesValid = userValidation.validateUserInput(notes);

   if (
      !employeeIdValid ||
      !longitudeValid ||
      !altitudeValid ||
      !latitudeValid ||
      !locationNameValid ||
      !actionValid ||
      !notesValid
   ) {
      // Handle the case where any of the user inputs are potentially malicious
      response(400, "02", "Invalid user input", {}, res, req);
      return; // Return early to prevent further processing
   }

   try {
      const datetime = new Date(); // Generate the current datetime

      await userModel.recordEmployeePresence(
         employeeId,
         longitude,
         altitude,
         latitude,
         datetime,
         locationName,
         action,
         notes
      );

      // Send the regular success response
      response(
         200,
         "00",
         "Employee presence recorded successfully",
         {},
         res,
         req
      );
   } catch (error) {
      console.error("Failed to record employee presence:", error);
      response(500, "99", "Failed to record employee presence", {}, res, req);
   }
}
async function getAttendanceClock(req, res) {
   const { employeeId, date, action } = req.body;
   if (
      !userValidation.validateUserInput(employeeId) ||
      !userValidation.validateUserInput(date) ||
      !userValidation.validateUserInput(action)
   ) {
      response(
         400,
         "Invalid user input",
         "User input contains potentially malicious characters",
         null,
         res,
         req
      );
      return; // Exit the function if input is invalid
   }
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

async function getAttendanceHistory(req, res) {
   const { employeeId, startDate, endDate } = req.body;

   if (
      !userValidation.validateUserInput(employeeId) ||
      !userValidation.validateUserInput(startDate) ||
      !userValidation.validateUserInput(endDate)
   ) {
      response(400, "05", "User input invalid", {}, res, req);
      return; // Exit the function if input is invalid
   }

   try {
      const endDatePlusOneDay = new Date(endDate);
      endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

      const attendanceData = await userModel.getAttendanceHistory(
         employeeId,
         startDate,
         endDatePlusOneDay
      );

      if (!attendanceData || attendanceData.length === 0) {
         response(
            404,
            "01",
            "No presence data found for the specified date range",
            {},
            res,
            req
         );
         return; // Exit the function if no data found
      }

      const attendanceByDay = {};

      for (const row of attendanceData) {
         const datetime = new Date(row.datetime);
         const day = datetime.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
         });

         if (!attendanceByDay[day]) {
            attendanceByDay[day] = [];
         }

         attendanceByDay[day].push({
            ...row,
            dayName: datetime.toLocaleDateString("en-US", {
               weekday: "long",
            }),
            date: day,
            time: datetime.toLocaleTimeString("en-US", {
               hour: "numeric",
               minute: "numeric",
               hour12: false,
            }),
         });
      }

      let responsePayload;
      if (startDate === endDate && attendanceByDay[startDate]) {
         // If start date and end date are the same and data is available for that day
         responsePayload = attendanceByDay[startDate];
      } else {
         // Process data for multiple days
         const combinedData = [];
         for (const day in attendanceByDay) {
            const dayData = attendanceByDay[day];

            const clockIn = dayData.find((data) => data.action === "Clock In");
            const clockBreakIn = dayData.find(
               (data) => data.action === "Clock Break In"
            );
            const clockOut = dayData.find(
               (data) => data.action === "Clock Out"
            );

            const duration = userModel.calculateDuration(clockIn, clockOut);

            combinedData.push({
               day,
               dayName: dayData[0].dayName,
               clockIn,
               clockBreakIn,
               clockOut,
               duration,
            });
         }

         responsePayload = combinedData;
      }

      response(
         200,
         "00",
         "Presence data retrieved successfully",
         responsePayload,
         res,
         req
      );
   } catch (error) {
      console.error("Failed to retrieve presence data:", error);
      response(500, "99", "Failed to retrieve presence data", {}, res, req);
   }
}

async function getAttendanceToday(req, res) {
   const { employeeId, date } = req.body;
   if (
      !userValidation.validateUserInput(employeeId) ||
      !userValidation.validateUserInput(date)
   ) {
      response(400, "04", "Invalid input", {}, res, req);
      return;
   }
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

async function getAttendanceRecent(req, res) {
   const { employeeId } = req.body;
   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const lastAttendance = await userModel.getLastAttendance(employeeId);

      if (!lastAttendance) {
         response(404, "01", "No presence data found", {}, res, req);
      } else {
         const { datetime, action } = lastAttendance;

         const formattedDateTime = new Date(datetime);
         const dayName = formattedDateTime.toLocaleDateString("en-US", {
            weekday: "long",
         });
         const date = formattedDateTime.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
         });
         const time = formattedDateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
         });

         let nextAction = "";
         if (action === "Clock In") {
            nextAction = "Clock Break In";
         } else if (action === "Clock Break In") {
            nextAction = "Clock Out";
         } else if (action === "Clock Out") {
            nextAction = "Clock In";
         }

         const responsePayload = {
            ...lastAttendance,
            dayName,
            date,
            time,
            nextAction,
         };

         response(
            200,
            "00",
            "Last attendance data retrieved successfully",
            responsePayload,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve last attendance data:", error);
      response(
         500,
         "99",
         "Failed to retrieve last attendance data",
         {},
         res,
         req
      );
   }
}

async function getMedicalPlafonds(req, res) {
   const { employeeId } = req.body;
   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      // Dummy response for plafonds
      const plafonds = {
         amount: "10.000.000",
         expiredDate: "1 Aug 2023",
      };

      const { amount, expiredDate } = plafonds;

      const plafondsData = {
         amount,
         expiredDate,
      };

      response(
         200,
         "00",
         "Plafonds retrieved successfully",
         plafondsData,
         res,
         req
      );
   } catch (error) {
      console.error("Failed to retrieve plafonds:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeavePlafonds(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userModel.getLeavePlaf(employeeId);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         const lastUpdate = new Date(leaveData.recordset[0].LastUpdateSaldo);
         leaveData.recordset[0].LastUpdateSaldo =
            userValidation.formatDate(lastUpdate);
         response(
            200,
            "00",
            "Leave data retrieved successfully",
            leaveData.recordset[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeaveList(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userModel.getLeaveList(employeeId);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Leave data retrieved successfully",
            leaveData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getLeaveDetail(req, res) {
   const { employeeId, RequestFormId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userModel.getLeaveDet(employeeId, RequestFormId);

      if (!leaveData || !leaveData.recordset || !leaveData.recordset.length) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Leave data retrieved successfully",
            leaveData.recordset[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve leave data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestCompleted(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestComp(employeeId);

      if (
         !requestData ||
         !requestData.recordset ||
         !requestData.recordset.length
      ) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestRejected(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestReject(employeeId);

      if (
         !requestData ||
         !requestData.recordset ||
         !requestData.recordset.length
      ) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestProgress(req, res) {
   const { employeeId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestProg(employeeId);

      if (
         !requestData ||
         !requestData.recordset ||
         !requestData.recordset.length
      ) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Request data retrieved successfully",
            requestData.recordset,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

async function getRequestDetail(req, res) {
   const { employeeId, RequestFormId } = req.body;

   // Validate the user input
   const isInputValid = userValidation.validateUserInput(employeeId);

   if (!isInputValid) {
      response(400, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const requestData = await userModel.getRequestDet(
         employeeId,
         RequestFormId
      );

      if (
         !requestData ||
         !requestData.recordset ||
         !requestData.recordset.length
      ) {
         response(404, "01", "Data not found", {}, res, req);
      } else {
         response(
            200,
            "00",
            "Request data retrieved successfully",
            requestData.recordset[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve request data:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   loginEmail,
   loginWA,
   logout,
   verifyOTP,
   verifyTokenHandler,
   getProfile,
   attendance,
   getAttendanceClock,
   getAttendanceHistory,
   getAttendanceToday,
   getAttendanceRecent,
   getMedicalPlafonds,
   getLeavePlafonds,
   getLeaveList,
   getLeaveDetail,
   getRequestCompleted,
   getRequestRejected,
   getRequestProgress,
   getRequestDetail,
};
