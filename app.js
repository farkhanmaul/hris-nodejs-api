const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes/api.js");
app.use("/", routes);

const port = process.env.APP_PORT || 3030;

app.listen(port, () => {
   console.log(`Server has successfully started on port ${port}`);
});
