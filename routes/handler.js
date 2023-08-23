const db = require("../config/database");

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

// =================================================================
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

/** send mail from real gmail account */
const getemail = (req, res) => {
   const { userEmail } = req.body;

   let config = {
      service: "gmail",
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD,
      },
   };

   let transporter = nodemailer.createTransport(config);

   let MailGenerator = new Mailgen({
      theme: "default",
      product: {
         name: "Mailgen",
         link: "https://mailgen.js/",
      },
   });

   let response = {
      body: {
         name: "OTP",
         intro: "INI OTP",
         table: {
            data: [
               {
                  item: "TESTING",
                  description: "Digunakan untuk login",
                  price: "$999",
               },
            ],
         },
         outro: "Jangan sampai lewat batas waktu",
      },
   };

   let mail = MailGenerator.generate(response);

   let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Mari Pulang",
      html: mail,
   };

   transporter
      .sendMail(message)
      .then(() => {
         return res.status(201).json({
            msg: "you should receive an email",
         });
      })
      .catch((error) => {
         return res.status(500).json({ error });
      });
};

module.exports = {
   loginUser,
   getemail,
};
