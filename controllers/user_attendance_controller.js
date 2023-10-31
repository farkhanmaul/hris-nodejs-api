const userModel = require("../models/user_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");

async function attendance(req, res) {
   const { employee_id, longitude, altitude, latitude, location_name, action, notes, photo } = req.body;
   // Validate employee_id, longitude, altitude, latitude, location_name, action, and notes
   const employee_idValid = validation.validateUserInput(employee_id);
   const longitudeValid = validation.validateUserInput(longitude);
   const altitudeValid = validation.validateUserInput(altitude);
   const latitudeValid = validation.validateUserInput(latitude);
   const location_nameValid = validation.validateUserInput(location_name);
   const actionValid = validation.validateUserInput(action);
   const notesValid = validation.validateUserInput(notes);

   if (
      !employee_idValid ||
      !longitudeValid ||
      !altitudeValid ||
      !latitudeValid ||
      !location_nameValid ||
      !actionValid ||
      !notesValid
   ) {
      // Handle the case where any of the user inputs are potentially malicious
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Return early to prevent further processing
   }

   try {
      const datetime = new Date();

      const insertedRow = await userModel.recordEmployeePresence(
         employee_id,
         longitude,
         altitude,
         latitude,
         datetime,
         location_name,
         action,
         notes,
         photo
      );

      // Send the success response with the inserted row's data
      response(HTTP_STATUS.OK, "00", "Employee presence recorded successfully", insertedRow, res, req);
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getAttendanceClock(req, res) {
   const { employee_id, date, action } = req.body;
   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(date) ||
      !validation.validateUserInput(action)
   ) {
      response(
         HTTP_STATUS.BAD_REQUEST,
         "Invalid user input",
         "User input contains potentially malicious characters",
         null,
         res,
         req
      );
      return; // Exit the function if input is invalid
   }
   try {
      const result = await userModel.getClockTimeData(employee_id, date, action);

      if (!result || result.length === 0) {
         response(
            HTTP_STATUS.NOT_FOUND,
            "01",
            "No clock data found for the specified date and action",
            { hasClockToday: false },
            res,
            req
         );
      } else {
         const clockTime = result[0].clockTime;
         const clockDate = new Date(result[0].clockDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
         });

         const action = result[0].action;
         response(
            HTTP_STATUS.OK,
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
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         "99",
         "Failed to retrieve clock time",
         { hasClockToday: false },
         res,
         req
      );
   }
}

async function getAttendanceHistory(req, res) {
   const { employee_id, start_date, end_date } = req.body;

   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(start_date) ||
      !validation.validateUserInput(end_date)
   ) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return; // Exit the function if input is invalid
   }

   try {
      const end_datePlusOneDay = new Date(end_date);
      end_datePlusOneDay.setDate(end_datePlusOneDay.getDate() + 1);

      const attendanceData = await userModel.getAttendanceHistory(employee_id, start_date, end_datePlusOneDay);

      if (!attendanceData || attendanceData.length === 0) {
         response(HTTP_STATUS.NOT_FOUND, "01", "No presence data found for the specified date range", {}, res, req);
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
      if (start_date === end_date && attendanceByDay[start_date]) {
         // If start date and end date are the same and data is available for that day
         responsePayload = attendanceByDay[start_date];
      } else {
         // Process data for multiple days
         const combinedData = [];
         for (const day in attendanceByDay) {
            const dayData = attendanceByDay[day];

            const clockIn = dayData.find((data) => data.action === "Clock In");
            const clockBreakIn = dayData.find((data) => data.action === "Clock Break In");
            const clockOut = dayData.find((data) => data.action === "Clock Out");

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

      response(HTTP_STATUS.OK, "00", "Presence data retrieved successfully", responsePayload, res, req);
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getAttendanceToday(req, res) {
   const { employee_id, date } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(date)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const result = await userModel.getPresenceData(employee_id, date);

      if (!result || result.length === 0) {
         response(HTTP_STATUS.NOT_FOUND, "01", "No presence data found for the specified date", {}, res, req);
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

         response(HTTP_STATUS.OK, "00", "Presence data retrieved successfully", attendanceData, res, req);
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function getAttendanceRecent(req, res) {
   const { employee_id } = req.body;
   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      const lastAttendance = await userModel.getLastAttendance(employee_id);

      if (!lastAttendance) {
         response(HTTP_STATUS.NOT_FOUND, "01", "Data not found", {}, res, req);
      } else {
         // Get the current timestamp
         const nowTime = new Date();
         const currentTime = nowTime.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
         });

         // Retrieve the relevant absence time range based on the current timestamp
         const absenceTimeRange = await userModel.getAttendanceTimeRangeByTime(currentTime);
         const workTimeRange = await userModel.getWorkingHour();

         let greeting;

         if (currentTime >= "05:00:00" && currentTime < "12:00:00") {
            greeting = "Good morning";
         } else if (currentTime >= "12:00:00" && currentTime < "18:00:00") {
            greeting = "Good afternoon";
         } else if (currentTime >= "18:00:00" && currentTime < "21:00:00") {
            greeting = "Good evening";
         } else {
            greeting = "Good night";
         }

         const responsePayload = {
            ...lastAttendance,
            currentTime,
            greeting,
            absenceTimeRange,
            workTimeRange,
         };

         response(HTTP_STATUS.OK, "00", "Last attendance data retrieved successfully", responsePayload, res, req);
      }
   } catch (error) {
      console.error("Failed to retrieve last attendance data:", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Failed to retrieve last attendance data", {}, res, req);
   }
}

// Multer configuration
const storage = multer.diskStorage({
   destination: "./uploads/",
   filename: (req, file, cb) => {
      // const timestamp = Date.now();
      const employeeId = req.body.employee_id;

      function formatDate(date) {
         const year = date.getFullYear();
         const month = date.getMonth() + 1;
         const day = date.getDate();
         const hour = date.getHours();
         const minute = date.getMinutes();
         const second = date.getSeconds();
         const formattedDate = `${year}${month}${day}${hour}${minute}${second}`;
         return formattedDate;
      }
      const date = new Date();
      const formattedDate = formatDate(date);

      const type = req.body.type;
      const extname = path.extname(file.originalname);
      const filename = `${employeeId}_${formattedDate}_${type}${extname}`;
      cb(null, filename);
   },
});

const upload = multer({
   storage,
   limits: {
      fileSize: 1 * 1024 * 1024, // 1MB file size limit
   },
   fileFilter: (req, file, cb) => {
      const allowedFileExtensions = [".jpg", ".jpeg", ".png"]; // Allowed file extensions

      const extname = path.extname(file.originalname);
      if (!allowedFileExtensions.includes(extname)) {
         return cb(new Error("Invalid file type. Only JPG, JPEG, and PNG files are allowed."));
      }

      cb(null, true);
   },
});

// Function to save attendance photo
async function saveAttendancePhotoMulter(req, res) {
   upload.single("photo")(req, res, async function (err) {
      const { employee_id, type, id } = req.body;

      if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(type)) {
         response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
         return; // Exit the function if input is invalid
      }

      if (err instanceof multer.MulterError) {
         console.error("Multer Error:", err);
         response(HTTP_STATUS.BAD_REQUEST, "98", "Error uploading photo", { error: err.code }, res, req);
      } else if (err) {
         console.error("Unknown Error:", err);
         response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
      } else {
         try {
            const filePath = req.file.path; // Get the path of the uploaded photo
            await userModel.insertEmployeePhoto(
               employee_id,
               filePath,
               id // Pass the file path to the insertEmployeePhoto function
            );
            response(HTTP_STATUS.OK, "00", "Attendance photo saved successfully", {}, res, req);
         } catch (error) {
            console.error("Internal Server Error:", error);
            response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
         }
      }
   });
}

module.exports = {
   attendance,
   getAttendanceClock,
   getAttendanceHistory,
   getAttendanceToday,
   getAttendanceRecent,
   saveAttendancePhotoMulter,
};
