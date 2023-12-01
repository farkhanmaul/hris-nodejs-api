const db1 = require("../config/database1");
const db2 = require("../config/database2");
const nodemailer = require("nodemailer");
const axios = require("axios");
const Mailgen = require("mailgen");

async function getUserEmail(employee_id) {
   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employee_id}'`;
      const result = await db1(query);

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

async function sendOTPbyEmail(receiver, otp, expired_at, employee_id) {
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
         title: "Welcome to ACA Mobile Apps!",
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
   const created_at = new Date();
   const no_hp = "";
   const query = `INSERT INTO user_otp (email, otp, expired_at, employee_id, created_at, no_hp) VALUES (?, ?, ?, ?, ?, ?)`;
   db2.query(query, [receiver, otp, expired_at, employee_id, created_at, no_hp], (error, results) => {
      if (error) {
         console.error("Error storing OTP in database:", error);
      }
   });
}

async function getUserOTP(employee_id) {
   const query = "SELECT otp, expired_at FROM user_otp WHERE employee_id = ? ORDER BY created_at DESC LIMIT 1";
   const result = await db2.query(query, [employee_id]);
   return result;
}

async function insertUserToken(employee_id, token, expirationDate) {
   const insertQuery = `INSERT INTO user_token (employee_id, token, expired_at, status, created_at) VALUES (?, ?, ?, ?, ?)`;
   const status = "open"; // Default value for the status column
   const created_at = new Date(); // Current datetime value for the created_at column

   await db2.query(insertQuery, [employee_id, token, expirationDate, status, created_at]);
}

async function getUserProfile(employee_id) {
   try {
      const query = `
      SELECT 
         e.EmployeeId, e.EmployeeFullName, e.PrimaryEmail, e.BirthDate, e.JoinCompany, e.MobilePhone1, e.MobilePhone2,
         j.JobTitleLabel,
         o.OrganizationLevelNum, o.OrganizationLevelEngLabel,
         s.StatusEngLabel,
         os.OrganizationLabel
      FROM 
         dbo.HrEmployee e
         INNER JOIN dbo.HrEmploymentHistory eh ON e.EmployeeId = eh.EmployeeId
         INNER JOIN dbo.HrReferenceJobTitle j ON eh.JobTitleId = j.JobTitleId
         INNER JOIN dbo.HrReferenceOrganizationLevel o ON eh.OrganizationLevelId = o.OrganizationLevelId
         INNER JOIN dbo.HrReferenceEmploymentStatus s ON eh.ReferenceStatusId = s.RefStatusId
         INNER JOIN dbo.HrReferenceOrganizationStructure os ON eh.OrganizationStructureId = os.OrganizationStructureId
      WHERE 
         e.EmployeeId = '${employee_id}'
         AND eh.IsExists = '1';
   `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getTokenStatus(token) {
   const selectQuery = `SELECT status FROM user_token WHERE token = ?`;
   const result = await db2.query(selectQuery, [token]);
   return result;
}

async function closeToken(token) {
   const updateQuery = `UPDATE user_token SET status = 'closed' WHERE token = ?`;
   await db2.query(updateQuery, [token]);
}

async function closeFbToken(employee_id) {
   const updateQuery = `UPDATE user_fbtoken SET is_active = false WHERE employee_id = ?`;
   await db2.query(updateQuery, [employee_id]);
}

async function getUserMobilePhones(employee_id) {
   try {
      const query = `SELECT MobilePhone1, MobilePhone2 FROM dbo.HrEmployee WHERE EmployeeId = '${employee_id}'`;
      const result = await db1(query);

      if (result.recordset && result.recordset.length > 0) {
         const no_hp = result.recordset[0];
         if (no_hp.MobilePhone1 && no_hp.MobilePhone1.startsWith("0")) {
            no_hp.MobilePhone1 = "62" + no_hp.MobilePhone1.slice(1);
         }
         if (no_hp.MobilePhone2 && no_hp.MobilePhone2.startsWith("0")) {
            no_hp.MobilePhone2 = "62" + no_hp.MobilePhone2.slice(1);
         }
         return no_hp;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function sendOTPbyWhatsApp(email, otp, expired_at, employee_id, created_at, destination, url, headers, data) {
   try {
      const insertQuery = `INSERT INTO user_otp (email, otp, expired_at, employee_id, created_at, no_hp) VALUES (?, ?, ?, ?, ?, ?)`;
      await db2.query(insertQuery, [email, otp, expired_at, employee_id, created_at, destination]);

      // This Code For Send OTP, Hapus jika tidak perlu
      const response = await axios.post(url, data, { headers });
      return response;
   } catch (error) {
      console.error("Failed to send OTP via WhatsApp and store in database:", error);
      throw error;
   }
}

async function getUserFullName(employee_id) {
   try {
      const query = `
         SELECT EmployeeFullName
         FROM dbo.HrEmployee
         WHERE EmployeeId = '${employee_id}';`;
      const result = await db1(query);

      if (result.recordset && result.recordset.length > 0) {
         const { EmployeeFullName } = result.recordset[0];
         return EmployeeFullName;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function insertUserDeviceId(employee_id, deviceId) {
   const selectQuery = `SELECT COUNT(*) AS count FROM user_device WHERE employee_id = ?`;
   const insertQuery = `INSERT INTO user_device (employee_id, device_id, inserted_at, updated_at) VALUES (?, ?, ?, ?)`;
   const updateQuery = `UPDATE user_device SET device_id = ?, updated_at = ? WHERE employee_id = ?`;
   const created_at = new Date(); // Current datetime value for the inserted_at and updated_at columns

   const [rows] = await db2.query(selectQuery, [employee_id]);
   const count = rows[0].count;

   if (count > 0) {
      // Employee ID already exists, perform an update
      await db2.query(updateQuery, [deviceId, created_at, employee_id]);
   } else {
      // Employee ID does not exist, perform an insert
      await db2.query(insertQuery, [employee_id, deviceId, created_at, created_at]);
   }
}

module.exports = {
   sendOTPbyEmail,
   sendOTPbyWhatsApp,
   getUserMobilePhones,
   getTokenStatus,
   getUserEmail,
   getUserOTP,
   getUserProfile,
   getUserFullName,
   insertUserToken,
   insertUserDeviceId,
   closeToken,
   closeFbToken,
};
