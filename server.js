const express = require("express");
const app = express();
const routes = require("./routes/main");
const cache = require("apicache").middleware
const PORT = 8000;

app.use(cache('2 minutes'))
app.use("/", routes);

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app