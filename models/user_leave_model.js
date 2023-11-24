const db1 = require("../config/database1");
const db2 = require("../config/database2");
const nodemailer = require("nodemailer");
const axios = require("axios");
const Mailgen = require("mailgen");

async function getLeavePlafondData(employee_id) {
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

async function getLeaveApprove(employee_id) {
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

async function getLeaveNotApprove(employee_id) {
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

async function getLeaveDetailData(employee_id, RequestFormId) {
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

module.exports = {
   getLeavePlafondData,
   getLeaveApprove,
   getLeaveNotApprove,
   getLeaveDetailData,
};
