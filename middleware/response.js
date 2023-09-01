const logAPICall = require("./logs");

const response = (status, responseCode, responseMessage, data, res, req) => {
   const payload = {
      respCode: responseCode,
      respMsg: responseMessage,
      data: data,
   };

   res.status(status).json(payload);
   const logData = {
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      endpoint: req.path,
      method: req.method,
      requestHeaders: req.headers ? JSON.stringify(req.headers) : "", // Check if req.header exists
      requestBody: JSON.stringify(req.body),
      responseStatus: status,
      responseMessage: JSON.stringify(payload), // Convert payload to JSON string
      employeeId: req.body.employeeId,
   };

   logAPICall(logData);
};

module.exports = response;
