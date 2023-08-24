const db = require("../config/database");
const db2 = require("../config/database2");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const randomstring = require("randomstring");

async function login(req, res) {
   const { employeeId } = req.body;

   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employeeId}'`;
      const result = await db2(query);
      if (!result.recordset || !result.recordset.length) {
         res.status(404).send("User not found");
      } else {
         const email = result.recordset[0].PrimaryEmail;
         const response = {
            respCode: "00",
            respMsg: "Employee Found, OTP Sent to Email",
            data: {
               employeeEmail: email,
            },
         };

         const otp = generateOTP();
         const expiredAt = generateExpirationDate(); // Get the expiration datetime

         await sendOTP(email, otp, expiredAt, employeeId); // Pass the expiredAt datetime to the sendOTP function

         res.status(200).json(response);
      }
   } catch (error) {
      console.error("Failed to retrieve user email:", error);
      res.status(500).send("Internal Server Error");
   }
}

// Generate OTP
function generateOTP() {
   const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
   });
   return otp;
}

// Generate expiration datetime
function generateExpirationDate() {
   const currentTime = new Date();
   const expirationTime = new Date(
      currentTime.getTime() + 3 * 30 * 24 * 60 * 60 * 1000
   ); // Set expiration time to 3 months from current time
   return expirationTime;
}

// Kirim OTP ke alamat email
async function sendOTP(receiver, otp, expiredAt, employeeId) {
   // Add expiredAt parameter
   // Configuration for the transporter to send emails using nodemailer
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.MAIL_EMAIL,
         pass: process.env.MAIL_PASSWORD,
      },
   });

   // Configuration for mailgen
   const mailGenerator = new Mailgen({
      theme: "default",
      product: {
         name: "Your App",
         link: "https://yourapp.com/",
         // Optional logo URL
         // logo: "https://yourapp.com/logo.png"
      },
   });

   // Generate the email body
   const email = {
      body: {
         name: receiver,
         intro: "Welcome to Aplikasi Hasil Buatan Kami! Here is your OTP:",
         table: {
            data: [
               {
                  OTP: otp,
               },
            ],
            columns: {
               // Optionally define column widths
               customWidth: {
                  OTP: "20%",
               },
               // Optionally define colors for the table headers
               customColors: {
                  OTP: "#2F4F4F",
               },
            },
         },
         outro: "Thank you for using Our App!",
      },
   };

   // Generate the email content
   const emailBody = mailGenerator.generate(email);

   // Configuration for the email
   const mailOptions = {
      from: "OTP@gmail.com",
      to: receiver,
      subject: "OTP Verification",
      html: emailBody,
   };

   // Send the email
   await transporter.sendMail(mailOptions);

   const query = `INSERT INTO user_otp (email, otp, expiredAt, employeeId) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE otp = VALUES(otp), expiredAt = VALUES(expiredAt)`;
   db.query(query, [receiver, otp, expiredAt, employeeId], (error, results) => {
      if (error) {
         console.error("Error storing OTP in database:", error);
      } else {
         console.log("OTP stored in database");
      }
   });
}

async function verifyOTP(req, res) {
   const { employeeId, otp } = req.body;

   const query = `SELECT * FROM user_otp WHERE employeeId = ? LIMIT 1`;

   db.query(query, [employeeId], async (error, results) => {
      if (error) {
         console.error("Error retrieving OTP from the database:", error);
         return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
         console.log("OTP not found for the given employeeId");
         return res.status(404).json({ error: "OTP not found" });
      }

      const storedOTP = results[0].otp;
      const expiredAt = results[0].expiredAt;

      // Compare the provided OTP with the stored OTP
      if (otp === storedOTP) {
         // Check if the OTP has expired
         const currentDateTime = new Date();
         const otpExpiredDateTime = new Date(expiredAt);

         if (currentDateTime > otpExpiredDateTime) {
            console.log("OTP has expired");
            return res.status(400).json({ error: "OTP has expired" });
         }

         // OTP is valid and not expired
         console.log("OTP verified successfully");
         return res.status(200).json({ message: "OTP verified successfully" });
      } else {
         console.log("Invalid OTP");
         return res.status(400).json({ error: "Invalid OTP" });
      }
   });
}

module.exports = {
   login,
   verifyOTP,
};
