const response = (status, responseCode, responseMessage, data, res) => {
   const responseObject = {
      respCode: responseCode,
      respMsg: responseMessage,
      data: data,
   };

   res.status(status).json(responseObject);
};

module.exports = response;
