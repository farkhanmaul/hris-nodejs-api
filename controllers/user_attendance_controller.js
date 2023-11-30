const globalModel = require("../models/global_model");
const userAttendanceModel = require("../models/user_attendance_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");
const path = require("path");

async function attendance(req, res) {
   const { employee_id, longitude, altitude, latitude, location_name, action, notes } = req.body;

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
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return; // Return early to prevent further processing
   }

   try {
      const datetime = new Date();

      const insertedRow = await userAttendanceModel.recordEmployeePresence(
         employee_id,
         longitude,
         altitude,
         latitude,
         datetime,
         location_name,
         action,
         notes
      );

      const responseData = {
         id: insertedRow.id,
      };

      // Send the success response with the inserted row's data
      response(
         HTTP_STATUS.OK,
         RESPONSE_CODES.SUCCESS,
         "Employee presence recorded successfully",
         responseData,
         res,
         req
      );
   } catch (error) {
      console.error("Internal Server Error:", error);
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

async function getAttendanceClock(req, res) {
   const { employee_id, date, action } = req.body;
   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(date) ||
      !validation.validateUserInput(action)
   ) {
      response(
         HTTP_STATUS.BAD_REQUEST,
         RESPONSE_MESSAGES.INVALID_INPUT,
         "User input contains potentially malicious characters",
         null,
         res,
         req
      );
      return;
   }
   try {
      const result = await userAttendanceModel.getClockTimeData(employee_id, date, action);

      if (!result || result.length === 0) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
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
            RESPONSE_CODES.SUCCESS,
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
         RESPONSE_CODES.SERVER_ERROR,
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
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   try {
      const end_datePlusOneDay = new Date(end_date);
      end_datePlusOneDay.setDate(end_datePlusOneDay.getDate() + 1);

      const attendanceData = await userAttendanceModel.getHistoryAttendanceData(
         employee_id,
         start_date,
         end_datePlusOneDay
      );

      if (!attendanceData || attendanceData.length === 0) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
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

            const duration = userAttendanceModel.calculateDuration(clockIn, clockOut);

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
         HTTP_STATUS.OK,
         RESPONSE_CODES.SUCCESS,
         "Presence data retrieved successfully",
         responsePayload,
         res,
         req
      );
   } catch (error) {
      console.error("Internal Server Error:", error);
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

async function getAttendanceToday(req, res) {
   const { employee_id, date } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(date)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await userAttendanceModel.getPresenceData(employee_id, date);

      if (!result || result.length === 0) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
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
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Presence data retrieved successfully",
            attendanceData,
            res,
            req
         );
      }
   } catch (error) {
      console.error("Internal Server Error:", error);
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

async function getAttendanceRecent(req, res) {
   const { employee_id } = req.body;

   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const lastAttendance = await userAttendanceModel.getLastAttendance(employee_id);

      const nowTime = new Date();
      const current_time = nowTime.toLocaleTimeString("en-US", {
         hour12: false,
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit",
      });

      // Retrieve the relevant absence time range based on the current timestamp
      const absence_time_range = await userAttendanceModel.getAttendanceTimeRangeByTime(current_time);
      const work_time_range = await userAttendanceModel.getWorkingHour();

      let greeting;

      if (current_time >= "05:00:00" && current_time < "12:00:00") {
         greeting = "Good morning";
      } else if (current_time >= "12:00:00" && current_time < "18:00:00") {
         greeting = "Good afternoon";
      } else if (current_time >= "18:00:00" && current_time < "21:00:00") {
         greeting = "Good evening";
      } else {
         greeting = "Good night";
      }
      // Get the global variable forceAttendancePhoto values
      const forceAttendancePhoto = "force_attendance_photo";
      const attendancePhotoStatus = await globalModel.specificSelectGlobalVariables(forceAttendancePhoto);

      // Get the global variable  values
      const onlyClockIn = "only_clock_in";
      const onlyClockInStatus = await globalModel.specificSelectGlobalVariables(onlyClockIn);

      // Get action if Only Clock In
      let actionOnlyClockIn;
      if (onlyClockInStatus.value === "ON") {
         actionOnlyClockIn = "Clock In";
      } else {
         actionOnlyClockIn = null;
      }

      // Get the global variable  values
      const intervalBookingTime = "interval_booking_time";
      const intervalStatus = await globalModel.specificSelectGlobalVariables(intervalBookingTime);

      const responsePayload = {
         last_action: lastAttendance.action,
         force_attendance_photo: attendancePhotoStatus.value,
         only_clock_in: onlyClockInStatus.value,
         action_only_clock_in: actionOnlyClockIn,
         interval_booking_time: intervalStatus.value,
         current_time,
         greeting,
         absence_time_range,
         work_time_range,
      };

      response(
         HTTP_STATUS.OK,
         RESPONSE_CODES.SUCCESS,
         "Last attendance data retrieved successfully",
         responsePayload,
         res,
         req
      );
   } catch (error) {
      console.error("Failed to retrieve last attendance data:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to retrieve last attendance data",
         {},
         res,
         req
      );
   }
}

// Multer configuration
const storage = multer.diskStorage({
   destination: async (req, file, cb) => {
      try {
         // Get the global variable values
         const globalVariable = "destination_attendance_photo";
         let destination;
         try {
            destination = await globalModel.specificSelectGlobalVariables(globalVariable);
         } catch (error) {
            destination = { value: "./uploads/" };
         }

         // Create the destination folder if it does not exist
         const destinationPath = path.resolve(destination.value);
         if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
         }
         cb(null, destination.value);
      } catch (error) {
         cb(error);
      }
   },
   filename: (req, file, cb) => {
      const employeeId = req.body.employee_id;

      function formatDate(date) {
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, "0");
         const day = String(date.getDate()).padStart(2, "0");
         const hour = String(date.getHours()).padStart(2, "0");
         const minute = String(date.getMinutes()).padStart(2, "0");
         const second = String(date.getSeconds()).padStart(2, "0");
         const formattedDate = `${year}${month}${day}_${hour}${minute}${second}`;
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

      if (
         !validation.validateUserInput(employee_id) ||
         !validation.validateUserInput(type) ||
         !validation.validateUserInput(id)
      ) {
         response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
         return;
      }

      if (err instanceof multer.MulterError) {
         console.error("Multer Error:", err);
         response(
            HTTP_STATUS.BAD_REQUEST,
            RESPONSE_CODES.INVALID_INPUT,
            "Error uploading photo",
            { error: err.code },
            res,
            req
         );
      } else if (err) {
         console.error("Unknown Error:", err);
         response(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            RESPONSE_CODES.SERVER_ERROR,
            RESPONSE_MESSAGES.SERVER_ERROR,
            {},
            res,
            req
         );
      } else {
         try {
            const filePath = req.file.path; // Get the path of the uploaded photo

            await userAttendanceModel.insertEmployeePhoto(
               employee_id,
               filePath,
               id // Pass the file path to the insertEmployeePhoto function
            );
            response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Attendance photo saved successfully", {}, res, req);
         } catch (error) {
            console.error("Internal Server Error:", error);
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
