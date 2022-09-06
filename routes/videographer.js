const express = require("express");
const Router = express.Router();

const videographer = require("../controllers/videographerController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", videographer.getAllVideographers);
Router.get("/getVideographer", videographer.getVideographerById);
Router.post(
  "/createNew",
  upload.single("image"),
  videographer.createVideographer
);
Router.delete("/delete", videographer.deleteVideographerById);
Router.post("/update", videographer.updateVideographerById);

module.exports = Router;
