require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.dbUrl;

mongoose
  .connect(url, { useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Error is occured", error);
  });
const db = mongoose.connection;

module.exports = db;
