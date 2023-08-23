const db = require("../config/database");
const db2 = require("../config/database2");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const randomstring = require("randomstring");

// Login Handler
async function loginUser(req, res) {
   const { employee_id, password } = req.body;

   // Check if the user exists in the database
   const query = `SELECT * FROM user WHERE employee_id = '${employee_id}'`;
   const [rows, fields] = await db.query(query);
   if (!rows || !rows.length) {
      res.status(401).send("Invalid employee ID or password");
   } else {
      // Check if the password is correct
      const storedPassword = rows[0].password;

      // Compare the provided password with the stored password
      if (password === storedPassword) {
         res.status(201).json({ message: "Login succeeded", employee_id });
      } else {
         res.status(401).send("Invalid employee ID or password");
      }
   }
}

const otpStore = {};

// Generate OTP
function generateOTP() {
   const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
   });
   return otp;
}

// Kirim OTP ke alamat email
async function sendOTP(receiver, otp) {
   // Configuration for the transporter to send emails using nodemailer
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD,
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
}

async function handleSendOTP(req, res) {
   try {
      const { receiver } = req.body;

      if (!receiver) {
         throw new Error("Receiver email is required");
      }

      const otp = generateOTP();
      otpStore[receiver] = otp;

      await sendOTP(receiver, otp);

      res.json({ message: "OTP has been sent successfully" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

function handleVerifyOTP(req, res) {
   try {
      const { receiver, otp } = req.body;

      if (!receiver || !otp) {
         throw new Error("Receiver email and OTP are required");
      }

      const storedOTP = otpStore[receiver];

      if (storedOTP && storedOTP === otp) {
         delete otpStore[receiver];
         res.json({ message: "OTP verification successful" });
      } else {
         res.json({ message: "Invalid OTP" });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

async function connectToSQLServer(req, res) {
   try {
      await db2();
      res.send("Connected to SQL Server");
   } catch (error) {
      console.error("Failed to connect to SQL Server:", error);
      res.status(500).send({
         msg: "Failed to connect to SQL Server",
         error: error.message,
      });
   }
}

module.exports = {
   loginUser,
   handleSendOTP,
   handleVerifyOTP,
   connectToSQLServer,
};
