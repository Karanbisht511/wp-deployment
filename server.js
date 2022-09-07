//after build
require("dotenv").config();

const express = require("express");
const indexRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", function (req, res) {
  app.use(express.static(path.join(__dirname, "build")));
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", indexRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
