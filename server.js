const dotenv = require("dotenv");
dotenv.config();

const { accessSync, constants, writeFileSync } = require("node:fs");
const serviceAccountFileName = "freshcan-storage.json";

// Get service account json from environment variable
const serviceAccountJSON = process.env.CREDENTIALS;
if (typeof serviceAccountJSON !== "undefined") {
   writeFileSync(serviceAccountFileName, serviceAccountJSON);
}

try {
   accessSync(serviceAccountFileName, constants.F_OK);
} catch (err) {
   throw new ReferenceError(
      "Doesn't have access to service-account.json or it's not created"
   );
}

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routes = require("./routes/routes.js");
app.use("/", routes);

const port = 3030;
// server:3000/
app.listen(port, () => {
   console.log(`Server berhasill berjalan pada port ${port}`);
});
