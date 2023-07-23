const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const users = require("./routes/api/users");

// Connect Mongodb Database
const db = process.env.MONGODB_URI;

mongoose.connect(db, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("There is problem while connecting database " + err);
  }
);

// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

app.use("/api/users", users);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`server listening on ${port}`));
module.exports = app;
