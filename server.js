const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routes = require("./routes/routes.js");
app.use("/", routes);

const port = 3030;

// server:3000/
app.listen(port, () => {
   console.log(`Server has successfully started on port ${port}`);
});
