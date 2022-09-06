const express = require("express");
const Router = express.Router();

const photographer = require("../controllers/photographerController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", photographer.getAllPhotographers);
Router.get("/getPhotographer", photographer.getPhotographerById);
Router.post(
  "/createNew",
  upload.single("image"),
  photographer.createPhotographer
);
Router.delete("/delete", photographer.deletePhotographerById);
Router.post("/update", photographer.updatePhotographerById);

module.exports = Router;
