const response = (status, responseCode, responseMessage, data, res) => {
   const payload = {
      respCode: responseCode,
      respMsg: responseMessage,
      data: data,
   };

   res.status(status).json(payload);
};

module.exports = response;
