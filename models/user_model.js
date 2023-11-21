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

async function sendOTPbyEmail(receiver, otp, expired_at, employee_id, device_id) {
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
      } else {
         console.log("OTP stored in database");
      }
   });

   const query2 = `INSERT INTO user_device (employee_id, device_id, inserted_at, updated_at) VALUES (?, ?, ?,?)`;
   db2.query(query2, [employee_id, device_id, created_at, created_at], (error, results) => {
      if (error) {
         console.error("Error storing Device Id in database:", error);
      } else {
         console.log("User Device stored in database");
      }
   });
}

async function getUserOTP(employee_id) {
   const query = "SELECT otp, expired_at FROM user_otp WHERE employee_id = ? ORDER BY created_at DESC LIMIT 1";
   const result = await db2.query(query, [employee_id]);
   return result;
}

async function storeUserToken(employee_id, token, expirationDate) {
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

async function recordEmployeePresence(
   employee_id,
   longitude,
   altitude,
   latitude,
   datetime,
   location_name,
   action,
   notes
) {
   const query = `INSERT INTO user_attendance (employee_id, longitude, altitude, latitude, datetime, location_name, action, notes) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   const result = await db2.query(query, [
      employee_id,
      longitude,
      altitude,
      latitude,
      datetime,
      location_name,
      action,
      notes,
   ]);

   // Fetch the inserted row from the database using the attendance_id
   const fetchQuery = `SELECT id FROM user_attendance WHERE employee_id = ? AND action = ? ORDER BY id DESC LIMIT 1`;
   const fetchedResult = await db2.query(fetchQuery, [employee_id, action]);
   // Return the inserted row's data
   return fetchedResult[0][0];
}

async function insertEmployeePhoto(employee_id, photo, id) {
   const query = `UPDATE user_attendance SET photo = ? WHERE employee_id = ? AND id = ?`;
   await db2.query(query, [photo, employee_id, id]);
}

async function getPresenceData(employee_id, date) {
   const query = `SELECT employee_id, longitude, altitude, latitude, datetime, location_name, action, notes FROM user_attendance WHERE employee_id = ? AND DATE(datetime) = ? ORDER BY datetime DESC`;
   const result = await db2.query(query, [employee_id, date]);
   return result[0];
}

async function getClockTimeData(employee_id, date, action) {
   const query = `
      SELECT DATE_FORMAT(datetime, '%H:%i') AS clockTime, action, DATE(datetime) AS clockDate
      FROM user_attendance
      WHERE employee_id = ? AND DATE(datetime) = ? AND action = ?
      ORDER BY datetime DESC
      LIMIT 1
   `;
   const result = await db2.query(query, [employee_id, date, action]);
   return result[0];
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

async function sendOTPbyWhatsApp(
   email,
   otp,
   expired_at,
   employee_id,
   created_at,
   destination,
   device_id,
   url,
   headers,
   data
) {
   try {
      const query2 = `INSERT INTO user_device (employee_id, device_id, inserted_at, updated_at) VALUES (?, ?, ?, ?)`;
      await db2.query(query2, [employee_id, device_id, created_at, created_at]);

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

async function getLastAttendance(employee_id) {
   try {
      const query = `SELECT action FROM user_attendance WHERE employee_id = ? ORDER BY datetime DESC LIMIT 1`;
      const result = await db2.query(query, [employee_id]);

      if (result && result[0] && result[0][0]) {
         return result[0][0];
      } else {
         return "undefined";
      }
   } catch (error) {
      console.error("Error:", error);
      return null;
   }
}

async function getAttendanceHistory(employee_id, start_date, end_date) {
   const query = `SELECT employee_id, longitude, altitude, latitude, datetime, location_name, action, notes FROM user_attendance WHERE employee_id = ? AND datetime >= ? AND datetime <= ? ORDER BY datetime DESC`;
   const result = await db2.query(query, [employee_id, start_date, end_date]);
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
async function getRequestComp(employee_id) {
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
         [RequestDate] AS Date,
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] IN ('20120500000007', '20120500000004', '20120500000003')
       AND [EmployeeId] = '${employee_id}'
       ORDER BY Date DESC;
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}
async function getRequestReject(employee_id) {
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
         [RequestDate] AS Date,
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] IN ('20120500000009', '20120500000012', '20120500000013')
       AND [EmployeeId] = '${employee_id}'
       ORDER BY Date DESC;
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getRequestProg(employee_id) {
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
         [RequestDate] AS Date,
         FORMAT([RequestDate],'dd MMMM yyyy') AS RequestDate
       FROM [LiteErp].[dbo].[vwCsRequestSummary]
       WHERE [CompletionId] = '20120500000002'
       AND [EmployeeId] = '${employee_id}'
       ORDER BY Date DESC;
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}
async function getRequestDet(employee_id, RequestFormId) {
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
       AND [EmployeeId] = '${employee_id}';
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeavePlaf(employee_id) {
   try {
      const query = `
      SELECT [CurrentCutiRegular], [TotalRequestCutiRegular], [SaldoCutiRegular], [LastUpdateSaldo]
      FROM [LiteErp].[dbo].[vwHrPersonalLeavesRemaining]
      WHERE [EmployeeId] = '${employee_id}';
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeaveListApprove(employee_id) {
   try {
      const query = `
  SELECT
    PLR.RequestFormId,
    PLR.EmployeeId,
    PLR.IsApprove,
    PLRD.LeaveType,
    FORMAT(PLRD.[StartDate], 'dd MMMM yyyy') AS StartDate,
    FORMAT(PLRD.[EndDate], 'dd MMMM yyyy') AS EndDate,
    RFL.ReferenceIndLabel
  FROM
    [LiteErp].[dbo].[HrPersonalLeaveReq] PLR
    JOIN [LiteErp].[dbo].[HrPersonalLeaveReqDetail] PLRD ON PLR.RequestFormId = PLRD.RequestFormId
    JOIN [LiteErp].[dbo].[HrReferenceLeave] RFL ON PLRD.LeaveType = RFL.RefLeaveId
  WHERE
    PLR.EmployeeId = '${employee_id}'
    AND PLR.IsApprove = 1
  ORDER BY
    PLRD.StartDate DESC;
`;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeaveListNotApprove(employee_id) {
   try {
      const query = `
  SELECT
    PLR.RequestFormId,
    PLR.EmployeeId,
    PLR.IsApprove,
    PLRD.LeaveType,
    FORMAT(PLRD.[StartDate], 'dd MMMM yyyy') AS StartDate,
    FORMAT(PLRD.[EndDate], 'dd MMMM yyyy') AS EndDate,
    RFL.ReferenceIndLabel
  FROM
    [LiteErp].[dbo].[HrPersonalLeaveReq] PLR
    JOIN [LiteErp].[dbo].[HrPersonalLeaveReqDetail] PLRD ON PLR.RequestFormId = PLRD.RequestFormId
    JOIN [LiteErp].[dbo].[HrReferenceLeave] RFL ON PLRD.LeaveType = RFL.RefLeaveId
  WHERE
    PLR.EmployeeId = '${employee_id}'
    AND PLR.IsApprove = 0
  ORDER BY
    PLRD.StartDate DESC;
`;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getLeaveDet(employee_id, RequestFormId) {
   try {
      const query = `
      SELECT plr.[RequestFormId]
      ,plr.[EmployeeId]
      ,plr.[IsApprove]
      ,plrd.[LeaveType]
      ,FORMAT(plrd.[StartDate],'dd MMMM yyyy') AS StartDate
      ,FORMAT(plrd.[EndDate],'dd MMMM yyyy') AS EndDate
      ,plrd.[LeaveReason]
      ,hrl.[ReferenceIndLabel]
FROM [LiteErp].[dbo].[HrPersonalLeaveReq] plr
INNER JOIN [LiteErp].[dbo].[HrPersonalLeaveReqDetail] plrd ON plrd.[RequestFormId] = plr.[RequestFormId]
INNER JOIN [LiteErp].[dbo].[HrReferenceLeave] hrl ON hrl.[RefLeaveId] = plrd.[LeaveType]
WHERE plr.[EmployeeId] = '${employee_id}'
      AND plr.[RequestFormId] = '${RequestFormId}';
     `;

      const result = await db1(query);

      return result;
   } catch (error) {
      throw error;
   }
}

async function getAttendanceTimeRangeByTime(current_time) {
   try {
      const query = `
       SELECT range_name, start_time, end_time
       FROM attendance_time_range
       WHERE ? >= start_time AND ? <= end_time
     `;
      const result = await db2.query(query, [current_time, current_time]);

      return result[0].length > 0 ? result[0][0] : null;
   } catch (error) {
      console.error("Failed to retrieve attendance time range:", error);
      throw error;
   }
}

async function getWorkingHour() {
   try {
      const query = `
       SELECT range_name, start_time, end_time
       FROM attendance_time_range
       WHERE range_name="Work Time"
     `;
      const result = await db2.query(query);

      return result[0].length > 0 ? result[0][0] : null;
   } catch (error) {
      console.error("Failed to retrieve attendance time range:", error);
      throw error;
   }
}

async function insertGlobalVariables(key_name, value) {
   const query = `INSERT INTO global_variables (key_name, value) VALUES (?, ?)`;

   db2.query(query, [key_name, value], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
}

async function updateGlobalVariables(key_name, value) {
   const query = `UPDATE global_variables SET value = ? WHERE key_name = ?`;

   db2.query(query, [value, key_name], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
}

async function allSelectGlobalVariables() {
   const query = `SELECT key_name, value FROM global_variables`;
   const result = await db2.query(query);
   return result[0];
}

async function specificSelectGlobalVariables(key_name) {
   try {
      const query = `SELECT key_name, value FROM global_variables WHERE key_name = ?`;
      const result = await db2.query(query, [key_name]);

      if (result && result[0] && result[0][0]) {
         return result[0][0];
      } else {
         return "undefined";
      }
   } catch (error) {
      console.error("Error:", error);
      return null;
   }
}

async function deleteGlobalVariables(key_name) {
   const query = `DELETE FROM global_variables WHERE key_name = ?`;

   db2.query(query, [key_name], (error, results) => {
      if (error) {
         console.error("Error:", error);
      } else {
         console.log("Success");
      }
   });
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

module.exports = {
   closeToken,
   sendOTPbyEmail,
   sendOTPbyWhatsApp,
   storeUserToken,
   recordEmployeePresence,
   insertEmployeePhoto,
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
   getLeaveListApprove,
   getLeaveListNotApprove,
   getLeaveDet,
   getAttendanceTimeRangeByTime,
   getWorkingHour,
   allSelectGlobalVariables,
   specificSelectGlobalVariables,
   insertGlobalVariables,
   deleteGlobalVariables,
   updateGlobalVariables,
   getUserFullName,
};
