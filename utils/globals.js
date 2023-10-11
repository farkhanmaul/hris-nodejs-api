// Define the HTTP_STATUS object
const HTTP_STATUS = {
   OK: 200,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   INTERNAL_SERVER_ERROR: 500,
};

// Define the RESPONSE_CODES object
const RESPONSE_CODES = {
   SUCCESS: "00",
   NOT_FOUND: "01",
   INVALID_INPUT: "98",
   SERVER_ERROR: "99",
};

// Define the RESPONSE_MESSAGES object
const RESPONSE_MESSAGES = {
   SUCCESS: "Success",
   NOT_FOUND: "Data not found",
   INVALID_INPUT: "Invalid user input",
   SERVER_ERROR: "Internal Server Error",
};

// Define and export global variables
module.exports = {
   HTTP_STATUS,
   RESPONSE_CODES,
   RESPONSE_MESSAGES,
};
