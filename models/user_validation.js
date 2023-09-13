// Generate OTP
const randomstring = require("randomstring");

function generateOTP() {
   return randomstring.generate({ length: 6, charset: "numeric" });
}

function generateExpirationDate() {
   const expirationTime = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);
   return expirationTime;
}

// Generate a random 30-digit string token
function generateRandomToken() {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let token = "";
   for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
   }
   return token;
}

function formatDate(date) {
   const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
   };
   return date.toLocaleDateString("id-ID", options);
}

function validateUserInput(userInput) {
   // Convert userInput to string
   const userInputString = String(userInput);

   // Check if userInputString is null, undefined, or empty
   if (userInput === null || userInput === undefined || userInput === "") {
      return false; // userInput is null, undefined, or empty, so it's not valid
   }

   // Check if userInputString contains any SQL keywords or characters that can be used for SQL injection
   const sqlKeywords = [
      "SELECT",
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP",
      "TABLE",
      "--",
   ];
   const forbiddenCharacters = ["'", '"', ";", "--"];

   for (let i = 0; i < sqlKeywords.length; i++) {
      if (userInputString.toUpperCase().includes(sqlKeywords[i])) {
         return false; // userInput contains SQL keywords, so it's potentially malicious
      }
   }

   for (let i = 0; i < forbiddenCharacters.length; i++) {
      if (userInputString.includes(forbiddenCharacters[i])) {
         return false; // userInput contains forbidden characters, so it's potentially malicious
      }
   }

   return true; // userInput is safe
}

module.exports = {
   validateUserInput,
   generateExpirationDate,
   generateOTP,
   generateRandomToken,
   formatDate,
};
