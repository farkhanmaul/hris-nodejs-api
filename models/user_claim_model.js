const db1 = require("../config/database1");

async function getRequestCompleted(employee_id) {
   try {
      const query = `
       SELECT TOP (1000)
         [RefRequestTypeName],
         [RequestFormId],
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

async function getRequestProgress(employee_id) {
   try {
      const query = `
       SELECT TOP (1000)
         [RefRequestTypeName],
         [RequestFormId],
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

async function getRequestDetail(employee_id, RequestFormId) {
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

module.exports = {
   getRequestCompleted,
   getRequestReject,
   getRequestProgress,
   getRequestDetail,
};
