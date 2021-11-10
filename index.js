"use strict";
require("dotenv").config();
// Start up DB Server
const { db } = require("./src/models/index.js");
const PORT = process.env.PORT || 3000;
db.sync()
  .then(() => {
    // Start the web server
    require("./src/server.js").startup(PORT);
  })
  .catch((err) => {
    console.log(err.message);
  });
