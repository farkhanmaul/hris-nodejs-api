const db = require("../config/database"); // Assuming the db library is used for database operations
const db2 = require("../config/database2"); // Assuming the db library is used for database operations
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

async function getUserEmail(employeeId) {
   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);
      if (result.recordset && result.recordset.length > 0) {
         const { PrimaryEmail } = result.recordset[0];
         return PrimaryEmail;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function sendOTP(receiver, otp, expiredAt, employeeId) {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.MAIL_EMAIL,
         pass: process.env.MAIL_PASSWORD,
      },
   });

   const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
         name: "Abhimata Citra Abadi",
         link: "http://www.abhimata.co.id/",
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
               customWidth: {
                  OTP: "20%",
               },
               customColors: {
                  OTP: "#2F4F4F",
               },
            },
         },
         outro: "Thank you for using ACA Apps! Enjoy your experience with us!",
      },
   };

   const emailBody = mailGenerator.generate(email);

   const mailOptions = {
      from: "OTP@gmail.com",
      to: receiver,
      subject: "Your OTP Code",
      html: emailBody,
   };

   await transporter.sendMail(mailOptions);
   const createdAt = new Date();
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

async function getUserOTP(employeeId) {
   const query = `SELECT otp, expiredAt FROM user_otp WHERE employeeId = '${employeeId}' ORDER BY createdAt DESC LIMIT 1`;
   const result = await db.query(query);
   return result;
}

async function storeUserToken(employeeId, token, expirationDate) {
   const insertQuery = `INSERT INTO user_token (employeeId, token, expiredAt, status, createdAt) VALUES (?, ?, ?, ?, ?)`;
   const status = "open"; // Default value for the status column
   const createdAt = new Date(); // Current datetime value for the createdAt column

   await db.query(insertQuery, [
      employeeId,
      token,
      expirationDate,
      status,
      createdAt,
   ]);
}

async function getUserProfile(employeeId) {
   const query = `SELECT EmployeeId, EmployeeFullName, PrimaryEmail, BirthDate, JoinCompany FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
   const result = await db2(query);
   return result;
}
async function getTokenStatus(token) {
   const selectQuery = `SELECT status FROM user_token WHERE token = ?`;
   const result = await db.query(selectQuery, [token]);
   return result;
}

async function closeToken(token) {
   const updateQuery = `UPDATE user_token SET status = 'closed' WHERE token = ?`;
   await db.query(updateQuery, [token]);
}

async function recordEmployeePresence(
   employeeId,
   longitude,
   altitude,
   latitude,
   datetime,
   locationName,
   action,
   notes
) {
   const query = `INSERT INTO user_presence (employeeId, longitude, altitude, latitude, datetime, location_name, action, notes) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   await db.query(query, [
      employeeId,
      longitude,
      altitude,
      latitude,
      datetime,
      locationName,
      action,
      notes,
   ]);
}

async function getPresenceData(employeeId, date) {
   const query = `SELECT * FROM user_presence WHERE employeeId = ? AND DATE(datetime) = ? ORDER BY datetime DESC`;
   const result = await db.query(query, [employeeId, date]);
   return result[0];
}

async function getClockTimeData(employeeId, date, action) {
   const query = `
      SELECT DATE_FORMAT(datetime, '%H:%i') AS clockTime, action, DATE(datetime) AS clockDate
      FROM user_presence
      WHERE employeeId = ? AND DATE(datetime) = ? AND action = ?
      ORDER BY datetime DESC
      LIMIT 1
   `;
   const result = await db.query(query, [employeeId, date, action]);
   return result[0];
}

module.exports = {
   getClockTimeData,
   getPresenceData,
   recordEmployeePresence,
   getUserEmail,
   sendOTP,
   getUserOTP,
   storeUserToken,
   getUserProfile,
   getTokenStatus,
   closeToken,
};
