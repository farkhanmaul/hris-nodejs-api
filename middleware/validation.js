// Input validation middleware
const validateLoginInput = (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "email and password are required" });
   }
   next();
};

// Input validation middleware
const validateRegisterInput = (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Email and password are required" });
   }
   if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
   }
   if (password.length < 6) {
      return res
         .status(400)
         .json({ message: "Password should be at least 6 characters" });
   }
   next();
};

module.exports = { validateLoginInput, validateRegisterInput };
