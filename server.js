const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routes = require("./routes/routes.js");
app.use("/", routes);

const dotenv = require("dotenv");
dotenv.config();

const port = 3030;
// server:3000/
app.listen(port, () => {
   console.log(`Server berhasill berjalan pada port ${port}`);
});
