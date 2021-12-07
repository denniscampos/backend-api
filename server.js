const express = require("express");
const app = express();
const axios = require("axios");
const routes = require("./routes/main");
const PORT = 8000;

// set up routes for server
app.use("/", routes);

app.listen(PORT, (req, res) => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app