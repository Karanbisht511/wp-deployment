const express = require("express");
const Router = express.Router();

const photographer = require("../controllers/photographerController");

Router.get("/", photographer.getAllPhotographers);
Router.get("/getPhotographer", photographer.getPhotographerById);
Router.post("/createNew", photographer.createPhotographer);
Router.delete("/delete", photographer.deletePhotographerById);
Router.post("/update", photographer.updatePhotographerById);

module.exports = Router;
