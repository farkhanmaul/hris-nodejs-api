const randomstring = require("randomstring");

function generateOTP() {
   return randomstring.generate({ length: 6, charset: "numeric" });
}

function generateExpirationDate() {
   const expirationTime = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);
   return expirationTime;
}

function generateRandomToken() {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
   return date.toLocaleDateString("en-US", options);
}

function formatDateWithHour(date) {
   const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
   };
   return date.toLocaleDateString("en-US", options);
}

function formatDateToPastFormat(dateString) {
   const now = new Date();
   const date = new Date(dateString);
   const diffInMilliseconds = now - date;

   // Calculate time difference in days
   const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

   if (diffInDays < 1) {
      // Less than a day ago
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      if (diffInHours < 1) {
         const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
         return `${diffInMinutes} minutes ago`;
      } else {
         return `${diffInHours} hours ago`;
      }
   } else if (diffInDays < 7) {
      // Less than 7 days ago
      return `${diffInDays} days ago`;
   } else {
      // More than 7 days ago
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
   }
}

function validateUserInput(userInput) {
   if (userInput === null || userInput === undefined || userInput === "") {
      return false;
   }

   const userInputString = String(userInput);
   const forbiddenCharacters = ["'", '"', ";", "--"];

   for (let i = 0; i < forbiddenCharacters.length; i++) {
      if (userInputString.includes(forbiddenCharacters[i])) {
         return false;
      }
   }

   return true;
}

module.exports = {
   validateUserInput,
   generateExpirationDate,
   generateOTP,
   generateRandomToken,
   formatDate,
   formatDateWithHour,
   formatDateToPastFormat,
};
