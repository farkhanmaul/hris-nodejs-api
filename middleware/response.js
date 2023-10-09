const logAPICall = require("./logger");
const moment = require("moment");

const response = (status, responseCode, responseMessage, data, res, req) => {
   const payload = {
      respCode: responseCode,
      respMsg: responseMessage,
      data: data,
   };

   const logData = {
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      endpoint: req.path,
      method: req.method,
      request_headers: req.headers ? JSON.stringify(req.headers) : "",
      request_body: JSON.stringify(req.body),
      response_status: status,
      response_message: JSON.stringify(payload),
      employee_id: req.body.employee_id ?? "null",
   };

   logAPICall(logData);
   res.status(status).json(payload);
};

module.exports = response;
