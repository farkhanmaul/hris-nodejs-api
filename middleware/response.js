const response = (statusCode, data, message, res) => {
   res.status(statusCode).json({
      status_code: statusCode,
      message: message,
      payload: data,
   });
};

module.exports = response;
