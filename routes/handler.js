const db = require("../config/database");
const db2 = require("../config/database2");
const response = require("../middleware/response");
const verifyToken = require("../middleware/verifyToken.js");
const randomstring = require("randomstring");
const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const axios = require("axios");

// Generate OTP
function generateOTP() {
   return randomstring.generate({ length: 6, charset: "numeric" });
}

function generateExpirationDate() {
   const expirationTime = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);
   return expirationTime;
}

// Generate a random 30-digit string token
function generateRandomToken() {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let token = "";
   for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
   }
   return token;
}

function formatDate(date) {
   const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
   };
   return date.toLocaleDateString("id-ID", options);
}

// login WA
async function login2(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT MobilePhone1, MobilePhone2 FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (!result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const mobilePhone1 = result.recordset[0].MobilePhone1;
         const mobilePhone2 = result.recordset[0].MobilePhone2;

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

         const otp = generateOTP();
         const expiredAt = generateExpirationDate(); // Get the expiration datetime

         // Send WhatsApp message
         const headers = {
            Accept: "application/json",
            APIKey: "process.env.YOUR_API_KEY", // belom ada
         };
         const data = {
            destination,
            message: `Gunakan OTP ${otp} untuk login akun ACA Anda. OTP akan kadaluarsa dalam waktu 5 menit.`, // Customize the message content as desired
         };
         const url = "https://api.nusasms.com/nusasms_api/1.0/whatsapp/message";

         axios
            .post(url, data, { headers })
            .then((response) => {
               console.log(response.data);
               response(200, "00", "OTP Sent to WhatsApp", {}, res, req);
            })
            .catch((error) => {
               console.error("Failed to send WhatsApp message:", error);
               response(500, "99", "Internal Server Error", {}, res, req);
            });
         // const query = `INSERT INTO user_otp (email, otp, expiredAt, employeeId, createdAt) VALUES (?, ?, ?, ?, ?)`;
         // db.query(
         //    query,
         //    [receiver, otp, expiredAt, employeeId, createdAt],
         //    (error, results) => {
         //       if (error) {
         //          console.error("Error storing OTP in database:", error);
         //       } else {
         //          console.log("OTP stored in database");
         //       }
         //    }
         // );
      }
   } catch (error) {
      console.error("Failed to retrieve user mobile phone:", error);
      response(500, "99", "Internal Server Error", {}, res, req);
   }
}

// login endpoint
async function login(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (!result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const email = result.recordset[0].PrimaryEmail;

         const otp = generateOTP();
         const expiredAt = generateExpirationDate(); // Get the expiration datetime

         await sendOTP(email, otp, expiredAt, employeeId); // Pass the expiredAt datetime to the sendOTP function

         response(
            200, //RC.HTTP.SUCCESS
            "00", // RC.SUCCESS
            "Employee Found, OTP Sent to Email", // RC.SUCCESS.MSG
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

// Kirim OTP ke alamat email
async function sendOTP(receiver, otp, expiredAt, employeeId) {
   // Add expiredAt parameter
   // Configuration for the transporter to send emails using nodemailer
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.MAIL_EMAIL,
         pass: process.env.MAIL_PASSWORD,
      },
   });

   // Configuration for mailgen
   const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
         name: "Abhimata Citra Abadi",
         link: "http://www.abhimata.co.id/",
         // Optional logo URL
         logo: "http://www.abhimata.co.id/v2.0//images/logo_aca.png",
      },
   });

   const email = {
      body: {
         title: "Welcome to ACA Apps!",
         intro: "For the security of your account, a one-time verification process is necessary using an OTP (One-Time Password). Here is your OTP:",
         table: {
            data: [
               {
                  OTP: `<div style="text-align: center;"><span style="font-size: 24px; font-weight: bold;">${otp}</span></div>`,
               },
            ],
            columns: {
               // Optionally define column widths
               customWidth: {
                  OTP: "20%",
               },
               // Optionally define colors for the table headers
               customColors: {
                  OTP: "#2F4F4F",
               },
            },
         },
         outro: "Thank you for using ACA Apps! Enjoy your experience with us!",
      },
   };

   // Generate the email content
   const emailBody = mailGenerator.generate(email);

   // Configuration for the email
   const mailOptions = {
      from: "OTP@gmail.com",
      to: receiver,
      subject: "Your OTP Code",
      html: emailBody,
   };

   // Send the email
   await transporter.sendMail(mailOptions);
   const createdAt = new Date(); // Generate the current datetime
   const query = `INSERT INTO user_otp (email, otp, expiredAt, employeeId, createdAt) VALUES (?, ?, ?, ?, ?)`;
   db.query(
      query,
      [receiver, otp, expiredAt, employeeId, createdAt],
      (error, results) => {
         if (error) {
            console.error("Error storing OTP in database:", error);
         } else {
            console.log("OTP stored in database");
         }
      }
   );
}

async function loginOTP(req, res) {
   const { employeeId, otp } = req.body;

   try {
      const query = `SELECT otp, expiredAt FROM user_otp WHERE employeeId = '${employeeId}' ORDER BY createdAt DESC limit 1`;
      const result = await db.query(query);

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
               const token = generateRandomToken();

               // Generate the expiration date (3 months from the current date)
               const expiredAt = generateExpirationDate();

               // Store the employeeId, token, and expiration date in the database
               const insertQuery = `INSERT INTO user_token (employeeId, token, expiredAt, status, createdAt) VALUES (?, ?, ?, ?, ?)`;
               const status = "open"; // Default value for the status column
               const createdAt = new Date(); // Current datetime value for the createdAt column

               await db.query(insertQuery, [
                  employeeId,
                  token,
                  expiredAt,
                  status,
                  createdAt,
               ]);
               response(
                  200,
                  "00",
                  "OTP verified",
                  { token: token, expiredAt: expiredAt },
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
      const query = `SELECT EmployeeId, EmployeeFullName, PrimaryEmail, BirthDate, JoinCompany FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (!result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res, req);
      } else {
         const profile = result.recordset[0];
         const birthDate = new Date(profile.BirthDate);
         const joinCompanyDate = new Date(profile.JoinCompany);

         profile.BirthDate = formatDate(birthDate); // Format BirthDate
         profile.JoinCompany = formatDate(joinCompanyDate); // Format JoinCompany

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
      const selectQuery = `SELECT status FROM user_token WHERE token = ?`;
      const result = await db.query(selectQuery, [token]);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(404, "01", "Token not found", {}, res, req);
      } else {
         const { status } = result[0][0];

         if (status === "closed") {
            response(400, "02", "Token is already closed", {}, res, req);
         } else {
            const updateQuery = `UPDATE user_token SET status = 'closed' WHERE token = ?`;
            await db.query(updateQuery, [token]);

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

      const query = `INSERT INTO user_presence (employeeId, longitude, altitude, latitude, datetime, location_name, action, notes) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      await db.query(query, [
         employeeId,
         longitude || defaultLongitude,
         altitude || defaultAltitude,
         latitude || defaultLatitude,
         datetime,
         locationName,
         action,
         notes,
      ]);

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
      const query = `SELECT * FROM user_presence WHERE employeeId = ? AND DATE(datetime) = ? ORDER BY datetime DESC`;
      const result = await db.query(query, [employeeId, date]);

      if (!result[0] || result[0].length === 0) {
         response(
            404,
            "01",
            "No presence data found for the specified date",
            {},
            res,
            req
         );
      } else {
         const attendanceData = result[0].map((row) => {
            const datetime = new Date(row.datetime);
            const dayName = datetime.toLocaleDateString("en-US", {
               weekday: "long",
            });
            const date = datetime.toLocaleDateString("en-US", {
               day: "numeric",
               month: "long",
            });
            const time = datetime.toLocaleTimeString("en-US", {
               hour: "numeric",
               minute: "numeric",
               hour12: false,
            });

            return {
               ...row,
               dayName,
               date,
               time,
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
      const query = `
         SELECT DATE_FORMAT(datetime, '%H:%i') AS clockTime, action, DATE(datetime) AS clockDate
         FROM user_presence
         WHERE employeeId = ? AND DATE(datetime) = ? AND action = ?
         ORDER BY datetime DESC
         LIMIT 1
      `;
      const result = await db.query(query, [employeeId, date, action]);

      if (!result[0] || result[0].length === 0) {
         response(
            404,
            "01",
            "No clock data found for the specified date and action",
            { hasClockToday: false }, // Added hasClockToday field with value false
            res,
            req
         );
      } else {
         const clockTime = result[0][0].clockTime;
         const clockDate = new Date(result[0][0].clockDate).toLocaleDateString(
            "id-ID",
            {
               day: "numeric",
               month: "long",
               year: "numeric",
            }
         );

         const action = result[0][0].action;
         response(
            200,
            "00",
            "Clock time retrieved successfully",
            {
               clockTime,
               clockDate,
               action,
               hasClockToday: true, // Added hasClockToday field with value true
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
      ); // Added hasClockToday field with value false
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

module.exports = {
   login,
   login2,
   loginOTP,
   userProfile,
   attendance,
   verifyTokenHandler,
   logout,
   getAttendance,
   getClockTime,
};
