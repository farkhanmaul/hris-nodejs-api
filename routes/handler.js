const db = require("../config/database");
const db2 = require("../config/database2");
const response = require("../middleware/response");
const nodemailer = require("nodemailer");
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

// login with mysql database
async function loginDummy(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT PrimaryEmail FROM user_dummy WHERE employeeId = '${employeeId}'`;
      const result = await db.query(query);
      if (!result || result.length === 0 || result[0].length === 0) {
         response(404, "00", "User not found", {}, res);
      } else {
         const email = result[0][0].PrimaryEmail;

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
   const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
   });
   return otp;
}

// Generate expiration datetime
function generateExpirationDate() {
   const currentTime = new Date();
   const expirationTime = new Date(
      currentTime.getTime() + 3 * 30 * 24 * 60 * 60 * 1000
   ); // Set expiration time to 3 months from current time
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

   const query = `INSERT INTO user_otp (email, otp, expiredAt, employeeId) VALUES (?, ?, ?, ?)`;
   db.query(query, [receiver, otp, expiredAt, employeeId], (error, results) => {
      if (error) {
         console.error("Error storing OTP in database:", error);
      } else {
         console.log("OTP stored in database");
      }
   });
}

async function verifyOTP(req, res) {
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
               const insertQuery = `INSERT INTO user_token (employeeId, token, expiredAt) VALUES (?, ?, ?)`;
               await db.query(insertQuery, [employeeId, token, expiredAt]);

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

async function getProfile(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT EmployeeId, EmployeeFullName, PrimaryEmail, BirthDate,JoinCompany FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (!result.recordset || !result.recordset.length) {
         response(404, "01", "User not found", {}, res);
      } else {
         const profile = result.recordset[0];
         response(200, "00", "Profile retrieved successfully", profile, res);
      }
   } catch (error) {
      console.error("Failed to retrieve user profile:", error);
      response(500, "02", "Internal Server Error", {}, res);
   }
}

async function employeePresence(req, res) {
   const { employeeId, longitude, latitude, datetime, locationName } = req.body;

   try {
      const query = `INSERT INTO employee_presence (employeeId, longitude, latitude, datetime, location_name) 
                    VALUES (?, ?, ?, ?, ?)`;
      await db.query(query, [
         employeeId,
         longitude,
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

module.exports = {
   login,
   loginDummy,
   verifyOTP,
   getProfile,
   employeePresence,
};
