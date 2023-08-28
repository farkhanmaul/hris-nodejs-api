const db = require("../config/database");
const db2 = require("../config/database2");
const response = require("../middleware/response");
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verifytoken.js");
const Mailgen = require("mailgen");
const randomstring = require("randomstring");

// login with ERP database
async function login(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);
      if (!result.recordset || !result.recordset.length) {
         response(404, "00", "User not found", {}, res);
      } else {
         const email = result.recordset[0].PrimaryEmail;

         const otp = generateOTP();
         const expiredAt = generateExpirationDate(); // Get the expiration datetime

         await sendOTP(email, otp, expiredAt, employeeId); // Pass the expiredAt datetime to the sendOTP function

         response(
            200,
            "00",
            "Employee Found, OTP Sent to Email",
            { employeeEmail: email },
            res
         );
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
      res.status(500).send("Internal Server Error");
   }
}

// Generate OTP

function generateOTP() {
   return randomstring.generate({ length: 6, charset: "numeric" });
}

function generateExpirationDate() {
   const expirationTime = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);
   return expirationTime;
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
      theme: "default",
      product: {
         name: "Your App",
         link: "https://yourapp.com/",
         // Optional logo URL
         // logo: "https://yourapp.com/logo.png"
      },
   });

   // Generate the email body
   const email = {
      body: {
         name: receiver,
         intro: "Welcome to Aplikasi Hasil Buatan Kami! Here is your OTP:",
         table: {
            data: [
               {
                  OTP: otp,
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
         outro: "Thank you for using Our App!",
      },
   };

   // Generate the email content
   const emailBody = mailGenerator.generate(email);

   // Configuration for the email
   const mailOptions = {
      from: "OTP@gmail.com",
      to: receiver,
      subject: "OTP Verification",
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
      const query = `SELECT otp, expiredAt FROM user_otp WHERE employeeId = '${employeeId}'`;
      const result = await db.query(query);

      if (!result || result.length === 0 || result[0].length === 0) {
         // Employee ID not found in user_otp table
         response(404, "01", "Employee ID not found", {}, res);
      } else {
         const { otp: storedOTP, expiredAt } = result[0][0];

         // Check if OTP is expired
         if (new Date() > new Date(expiredAt)) {
            response(400, "02", "OTP has expired", {}, res);
         } else {
            // Verify the OTP (case-insensitive and ignore leading/trailing white spaces)
            if (
               otp &&
               storedOTP &&
               otp.trim().toLowerCase() === storedOTP.trim().toLowerCase()
            ) {
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
                  res
               );
            } else {
               // OTP is incorrect
               response(404, "03", "Invalid OTP", {}, res);
            }
         }
      }
   } catch (error) {
      console.error("Failed to verify OTP:", error);
      response(500, "99", "Internal Server Error", {}, res);
   }
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

async function userProfile(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT EmployeeId, EmployeeFullName, PrimaryEmail, BirthDate, JoinCompany FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (!result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res);
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

         response(200, "00", "Profile retrieved successfully", profile, res);
      }
   } catch (error) {
      console.error("Failed to retrieve user profile:", error);
      response(500, "02", "Internal Server Error", {}, res);
   }
}

async function verifyTokenHandler(req, res, next) {
   try {
      await verifyToken(req, res); // Pass req, res, and next as separate arguments
   } catch (error) {
      console.error("Failed to verify token:", error);
      return response(500, "99", "Internal Server Error", {}, res);
   }
}

async function logout(req, res) {
   const token = req.headers["x-api-key"];

   try {
      const selectQuery = `SELECT status FROM user_token WHERE token = ?`;
      const result = await db.query(selectQuery, [token]);

      if (!result || result.length === 0 || result[0].length === 0) {
         response(404, "01", "Token not found", {}, res);
      } else {
         const { status } = result[0][0];

         if (status === "closed") {
            response(400, "02", "Token is already closed", {}, res);
         } else {
            const updateQuery = `UPDATE user_token SET status = 'closed' WHERE token = ?`;
            await db.query(updateQuery, [token]);

            response(200, "00", "Logout successful", {}, res);
         }
      }
   } catch (error) {
      console.error("Failed to logout:", error);
      response(500, "99", "Internal Server Error", {}, res);
   }
}
async function userPresence(req, res) {
   const { employeeId, longitude, altitude, latitude, locationName } = req.body;

   try {
      const datetime = new Date(); // Generate the current datetime

      const query = `INSERT INTO user_presence (employeeId, longitude, altitude, latitude, datetime, location_name) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
      await db.query(query, [
         employeeId,
         longitude,
         altitude,
         latitude,
         datetime,
         locationName,
      ]);

      // If the insertion is successful, you can send a success response
      response(200, "00", "Employee presence recorded successfully", {}, res);
   } catch (error) {
      console.error("Failed to record employee presence:", error);
      response(500, "99", "Failed to record employee presence", {}, res);
   }
}

async function getPresence(req, res) {
   const { employeeId, date } = req.body;

   try {
      const query = `SELECT * FROM user_presence WHERE employeeId = ? AND DATE(datetime) = ?`;
      const result = await db.query(query, [employeeId, date]);

      if (!result[0] || result[0].length === 0) {
         response(
            404,
            "01",
            "No presence data found for the specified date",
            {},
            res
         );
      } else {
         response(
            200,
            "00",
            "Presence data retrieved successfully",
            result[0],
            res
         );
      }
   } catch (error) {
      console.error("Failed to retrieve presence data:", error);
      response(500, "99", "Failed to retrieve presence data", {}, res);
   }
}

module.exports = {
   login,
   loginOTP,
   userProfile,
   userPresence,
   verifyTokenHandler,
   logout,
   getPresence,
};
