const db1 = require("../config/database1");
const db2 = require("../config/database2");
const db3 = require("../config/database3");
const response = require("../middleware/response");
const nodemailer = require("nodemailer");
const axios = require("axios");
const Mailgen = require("mailgen");

async function checkEmployeeExistence(employee_id) {
   const query = "SELECT employee_id from user_roles WHERE employee_id = ?";
   const result = await db3.query(query, [employee_id]);
   return result[0][0];
}

async function getUserEmail(employee_id) {
   try {
      const query = `SELECT PrimaryEmail FROM dbo.HrEmployee WHERE EmployeeId = '${employee_id}'`;
      const result = await db1(query);

      if (result.recordset && result.recordset.length > 0) {
         const { PrimaryEmail } = result.recordset[0];
         return PrimaryEmail;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function sendOTPbyEmailPortal(receiver, otp, expired_at, employee_id) {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.MAIL_EMAIL,
         pass: process.env.MAIL_PASSWORD,
      },
   });

   const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
         name: "Abhimata Citra Abadi",
         link: "http://www.abhimata.co.id/",
         logo: "http://www.abhimata.co.id/v2.0//images/logo_aca.png",
      },
   });

   const email = {
      body: {
         title: "Welcome to ACA Apps!",
         intro: "For the security of your account, a one-time verification process is necessary using an OTP (One-Time Password). Here is your OTP:",
         table: {
            data: [
               {
                  OTP: `<div style="text-align: center;"><span style="font-size: 24px; font-weight: bold;">${otp}</span></div>`,
               },
            ],
            columns: {
               customWidth: {
                  OTP: "20%",
               },
               customColors: {
                  OTP: "#2F4F4F",
               },
            },
         },
         outro: "Thank you for using ACA Apps! Enjoy your experience with us!",
      },
   };

   const emailBody = mailGenerator.generate(email);

   const mailOptions = {
      from: "OTP@gmail.com",
      to: receiver,
      subject: "Your OTP Code",
      html: emailBody,
   };

   await transporter.sendMail(mailOptions);
   const created_at = new Date();
   const no_hp = "";
   const query = `INSERT INTO user_otp_web (email, otp, expired_at, employee_id, created_at, no_hp) VALUES (?, ?, ?, ?, ?, ?)`;
   db3.query(
      query,
      [receiver, otp, expired_at, employee_id, created_at, no_hp],
      (error, results) => {
         if (error) {
            console.error("Error storing OTP in database:", error);
         } else {
            console.log("OTP stored in database");
         }
      }
   );
}

async function getUserMobilePhones(employee_id) {
   try {
      const query = `SELECT MobilePhone1, MobilePhone2 FROM dbo.HrEmployee WHERE EmployeeId = '${employee_id}'`;
      const result = await db1(query);

      if (result.recordset && result.recordset.length > 0) {
         const no_hp = result.recordset[0];
         if (no_hp.MobilePhone1 && no_hp.MobilePhone1.startsWith("0")) {
            no_hp.MobilePhone1 = "62" + no_hp.MobilePhone1.slice(1);
         }
         if (no_hp.MobilePhone2 && no_hp.MobilePhone2.startsWith("0")) {
            no_hp.MobilePhone2 = "62" + no_hp.MobilePhone2.slice(1);
         }
         return no_hp;
      } else {
         return null;
      }
   } catch (error) {
      throw error;
   }
}

async function sendOTPbyWhatsAppPortal(
   email,
   otp,
   expired_at,
   employee_id,
   created_at,
   destination,
   url,
   headers,
   data
) {
   try {
      const insertQuery = `INSERT INTO user_otp_web (email, otp, expired_at, employee_id, created_at, no_hp) VALUES (?, ?, ?, ?, ?, ?)`;
      await db3.query(insertQuery, [
         email,
         otp,
         expired_at,
         employee_id,
         created_at,
         destination,
      ]);

      // This Code For Send OTP, Hapus jika tidak perlu
      const response = await axios.post(url, data, { headers });
      return response;
   } catch (error) {
      console.error(
         "Failed to send OTP via WhatsApp and store in database:",
         error
      );
      throw error;
   }
}

async function getUserOTPportal(employee_id) {
   const query =
      "SELECT otp, expired_at FROM user_otp_web WHERE employee_id = ? ORDER BY created_at DESC LIMIT 1";
   const result = await db3.query(query, [employee_id]);
   return result;
}

module.exports = {
   checkEmployeeExistence,
   getUserEmail,
   sendOTPbyEmailPortal,
   getUserMobilePhones,
   sendOTPbyWhatsAppPortal,
   getUserOTPportal,
};
