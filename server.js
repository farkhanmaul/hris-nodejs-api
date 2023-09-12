const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());
const routes = require("./routes/routes.js");
app.use("/", routes);

const port = process.env.APP_PORT || 3030;

app.listen(port, () => {
   console.log(`Server has successfully started on port ${port}`);
});
