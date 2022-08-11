const express = require("express");
const Router = express.Router();

const videographer = require("../controllers/videographerController");

Router.get("/", videographer.getAllVideographers);
Router.get("/getVideographer", videographer.getVideographerById);
Router.post("/createNew", videographer.createVideographer);
Router.delete("/delete", videographer.deleteVideographerById);
Router.post("/update", videographer.updateVideographerById);

module.exports = Router;
