const globalModel = require("../models/global_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");

async function insertGlobalVariables(req, res) {
   const { key_name, value } = req.body;
   if (!validation.validateUserInput(key_name) || !validation.validateUserInput(value)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      await globalModel.insertGlobalVariables(key_name, value);
      response(HTTP_STATUS.OK, "00", "Success to Insert Variables", {}, res, req);
   } catch (error) {
      console.error("Failed to Insert", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function updateGlobalVariables(req, res) {
   const { key_name, value } = req.body;
   if (!validation.validateUserInput(key_name) || !validation.validateUserInput(value)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      await globalModel.updateGlobalVariables(key_name, value);
      response(HTTP_STATUS.OK, "00", "Success to Update Variable", {}, res, req);
   } catch (error) {
      console.error("Failed to Update", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function selectGlobalVariables(req, res) {
   try {
      const variables = await globalModel.allSelectGlobalVariables();
      response(HTTP_STATUS.OK, "00", "Success to Retrieve Variables", { variables }, res, req);
   } catch (error) {
      console.error("Failed to Retrieve", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

async function deleteGlobalVariables(req, res) {
   const { key_name } = req.body;
   if (!validation.validateUserInput(key_name)) {
      response(HTTP_STATUS.BAD_REQUEST, "98", "Invalid user input", {}, res, req);
      return;
   }
   try {
      await globalModel.deleteGlobalVariables(key_name);
      response(HTTP_STATUS.OK, "00", "Success to Delete Variable", {}, res, req);
   } catch (error) {
      console.error("Failed to Delete", error);
      response(HTTP_STATUS.INTERNAL_SERVER_ERROR, "99", "Internal Server Error", {}, res, req);
   }
}

module.exports = {
   insertGlobalVariables,
   updateGlobalVariables,
   selectGlobalVariables,
   deleteGlobalVariables,
};
