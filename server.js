require("dotenv").config();

const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", indexRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
