const db = require("../config/database"); // Assuming the db library is used for database operations
const db2 = require("../config/database2"); // Assuming the db library is used for database operations
const response = require("../middlewares/response");
const nodemailer = require("nodemailer");
const axios = require("axios");
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

async function sendOTPbyEmail(receiver, otp, expiredAt, employeeId, deviceId) {
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
   const mobilePhone = "none";
   const query = `INSERT INTO user_otp (email, otp, expiredAt, employeeId, createdAt, mobilePhone) VALUES (?, ?, ?, ?, ?, ?)`;
   db.query(
      query,
      [receiver, otp, expiredAt, employeeId, createdAt, mobilePhone],
      (error, results) => {
         if (error) {
            console.error("Error storing OTP in database:", error);
         } else {
            console.log("OTP stored in database");
         }
      }
   );

   const query2 = `INSERT INTO user_device (employeeId, deviceId, insertedDate, lastUpdate) VALUES (?, ?, ?,?)`;
   db.query(
      query2,
      [employeeId, deviceId, createdAt, createdAt],
      (error, results) => {
         if (error) {
            console.error("Error storing Device Id in database:", error);
         } else {
            console.log("OTP stored in database");
         }
      }
   );
}

async function getUserOTP(employeeId) {
   const query =
      "SELECT otp, expiredAt FROM user_otp WHERE employeeId = ? ORDER BY createdAt DESC LIMIT 1";
   const result = await db.query(query, [employeeId]);
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
   try {
      const query = `
      SELECT 
         e.EmployeeId, e.EmployeeFullName, e.PrimaryEmail, e.BirthDate, e.JoinCompany, 
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
         e.EmployeeId = '${employeeId}'
         AND eh.IsExists = '1';
   `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
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

async function getUserMobilePhones(employeeId) {
   try {
      const query = `SELECT MobilePhone1, MobilePhone2 FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);

      if (result.recordset && result.recordset.length > 0) {
         const mobilePhones = result.recordset[0];
         if (
            mobilePhones.MobilePhone1 &&
            mobilePhones.MobilePhone1.startsWith("0")
         ) {
            mobilePhones.MobilePhone1 =
               "62" + mobilePhones.MobilePhone1.slice(1);
         }
         if (
            mobilePhones.MobilePhone2 &&
            mobilePhones.MobilePhone2.startsWith("0")
         ) {
            mobilePhones.MobilePhone2 =
               "62" + mobilePhones.MobilePhone2.slice(1);
         }
         return mobilePhones;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function sendOTPbyWhatsApp(
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
) {
   try {
      const query2 = `INSERT INTO user_device (employeeId, deviceId, insertedDate, lastUpdate) VALUES (?, ?, ?, ?)`;
      await db.query(query2, [employeeId, deviceId, createdAt, createdAt]);

      const insertQuery = `INSERT INTO user_otp (email, otp, expiredAt, employeeId, createdAt, mobilePhone) VALUES (?, ?, ?, ?, ?, ?)`;
      await db.query(insertQuery, [
         email,
         otp,
         expiredAt,
         employeeId,
         createdAt,
         destination,
      ]);

      // This Code For Send OTP, Hapus jika tidak perlu
      const response = await axios.post(url, data, { headers });
      console.log(response.data);
      return response;
   } catch (error) {
      console.error(
         "Failed to send OTP via WhatsApp and store in database:",
         error
      );
      throw error;
   }
}

function getLastAttendance(employeeId) {
   const query = `SELECT * FROM user_presence WHERE employeeId = ? ORDER BY datetime DESC LIMIT 1`;
   return db.query(query, [employeeId]).then((result) => result[0][0]);
}

async function getAttendanceHistory(employeeId, startDate, endDate) {
   const query = `SELECT * FROM user_presence WHERE employeeId = ? AND datetime >= ? AND datetime <= ? ORDER BY datetime DESC`;
   const result = await db.query(query, [employeeId, startDate, endDate]);
   return result[0];
}

function calculateDuration(clockIn, clockOut) {
   // Check if both clock in and clock out times are available
   if (clockIn && clockOut) {
      const clockInTime = new Date(clockIn.datetime);
      const clockOutTime = new Date(clockOut.datetime);
      const durationMilliseconds = clockOutTime - clockInTime;
      const durationMinutes = Math.floor(durationMilliseconds / (1000 * 60));
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours}h ${minutes}m`;
   }

   return `0h 0m`;
}
async function getRequestComp(employeeId) {
   try {
      const query = `
       SELECT TOP (1000)
         [RefRequestTypeName],
         [RequestFormId],
         [ProjectFullName],
         [NextCheckerName],
         [CompletionName],
         [CompletionId],
         [TotalRequest], 
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] IN ('20120500000007', '20120500000004', '20120500000003')
       AND [EmployeeId] = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}
async function getRequestReject(employeeId) {
   try {
      const query = `
       SELECT TOP (1000)
         [RefRequestTypeName],
         [RequestFormId],
         [ProjectFullName],
         [NextCheckerName],
         [CompletionName],
         [CompletionId],
         [TotalRequest], 
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] IN ('20120500000009', '20120500000012', '20120500000013')
       AND [EmployeeId] = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getRequestProg(employeeId) {
   try {
      const query = `
       SELECT TOP (1000)
         [RefRequestTypeName],
         [RequestFormId],
         [ProjectFullName],
         [NextCheckerName],
         [CompletionName],
         [CompletionId],
         [TotalRequest], 
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] = '20120500000002'
       AND [EmployeeId] = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}
async function getRequestDet(employeeId, RequestFormId) {
   try {
      const query = `
       SELECT TOP (1)
         [RefRequestTypeName],
         [RequestFormId],
         [ProjectFullName],
         [NextCheckerName],
         [CompletionName],
         [CompletionId],
         [TotalRequest], 
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [RequestFormId] = '${RequestFormId}'
       AND [EmployeeId] = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeavePlaf(employeeId) {
   try {
      const query = `
      SELECT [CurrentCutiRegular], [TotalRequestCutiRegular], [SaldoCutiRegular], [LastUpdateSaldo]
      FROM [LiteErp].[dbo].[vwHrPersonalLeavesRemaining]
      WHERE [EmployeeId] = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeaveList(employeeId) {
   try {
      const query = `
      SELECT PLR.RequestFormId, PLR.EmployeeId, PLR.IsApprove, PLRD.LeaveType, PLRD.StartDate, PLRD.EndDate, RFL.RefLeaveId, RFL.ReferenceIndLabel FROM [LiteErp].[dbo].[HrPersonalLeaveReq] PLR JOIN [LiteErp].[dbo].[HrPersonalLeaveReqDetail] PLRD ON PLR.RequestFormId = PLRD.RequestFormId JOIN [LiteErp].[dbo].[HrReferenceLeave] RFL ON PLRD.LeaveType = RFL.RefLeaveId WHERE PLR.EmployeeId = '${employeeId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeaveDet(employeeId, RequestFormId) {
   try {
      const query = `
      SELECT plr.[RequestFormId]
      ,plr.[EmployeeId]
      ,plr.[IsApprove]
      ,plrd.[LeaveType]
      ,plrd.[StartDate]
      ,plrd.[EndDate]
      ,plrd.[LeaveReason]
      ,hrl.[ReferenceIndLabel]
FROM [LiteErp].[dbo].[HrPersonalLeaveReq] plr
INNER JOIN [LiteErp].[dbo].[HrPersonalLeaveReqDetail] plrd ON plrd.[RequestFormId] = plr.[RequestFormId]
INNER JOIN [LiteErp].[dbo].[HrReferenceLeave] hrl ON hrl.[RefLeaveId] = plrd.[LeaveType]
WHERE plr.[EmployeeId] = '${employeeId}'
      AND plr.[RequestFormId] = '${RequestFormId}';
     `;

      const result = await db2(query);

      return result;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   closeToken,
   sendOTPbyEmail,
   sendOTPbyWhatsApp,
   storeUserToken,
   recordEmployeePresence,
   calculateDuration,
   getLastAttendance,
   getUserMobilePhones,
   getClockTimeData,
   getPresenceData,
   getTokenStatus,
   getUserEmail,
   getUserOTP,
   getUserProfile,
   getAttendanceHistory,
   getRequestComp,
   getRequestReject,
   getRequestProg,
   getRequestDet,
   getLeavePlaf,
   getLeaveList,
   getLeaveDet,
};
