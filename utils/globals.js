const HTTP_STATUS = {
   OK: 200,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   INTERNAL_SERVER_ERROR: 500,
};

const RESPONSE_CODES = {
   SUCCESS: "00",
   NOT_FOUND: "01",
   INVALID_INPUT: "98",
   SERVER_ERROR: "99",
};

const RESPONSE_MESSAGES = {
   NOT_FOUND: "Data Not Found",
   INVALID_INPUT: "Invalid user input",
   SERVER_ERROR: "Internal Server Error",
};

module.exports = {
   HTTP_STATUS,
   RESPONSE_CODES,
   RESPONSE_MESSAGES,
};
