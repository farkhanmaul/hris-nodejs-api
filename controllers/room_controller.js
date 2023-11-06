const userModel = require("../models/user_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function room(req, res) {
   const { employee_id } = req.body;

   // Validate the user input
   const isInputValid = validation.validateUserInput(employee_id);

   if (!isInputValid) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }

   try {
      const leaveData = await userModel.getLeavePlaf(employee_id);
   } catch (error) {}
}

module.exports = {};
