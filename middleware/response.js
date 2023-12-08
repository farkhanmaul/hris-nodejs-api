const logAPICall = require("./logger");
const moment = require("moment");

const response = (status, responseCode, responseMessage, data, res, req) => {
   const payload = {
      respCode: responseCode,
      respMsg: responseMessage,
      data: data,
   };
   const logData = {
      employee_id: req.body.employee_id ?? "",
      ip_address: req.ip,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      endpoint: req.path,
      method: req.method,
      response_status: status,
      request_headers: req.headers ? JSON.stringify(req.headers) : "",
      request_body: JSON.stringify(req.body),
      response_message: JSON.stringify(payload),
   };

   logAPICall(logData);
   res.status(status).json(payload);
};

module.exports = response;
