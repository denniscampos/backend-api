const express = require("express");
const app = express();
const axios = require("axios");
const routes = require("./routes/main");
const PORT = 8000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// set up routes for server
app.use("/", routes);

app.listen(PORT, (req, res) => {
  console.log(`server running on port ${PORT}`);
});