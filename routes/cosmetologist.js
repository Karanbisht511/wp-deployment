const express = require("express");
const Router = express.Router();

const cosmetologistController = require("../controllers/cosmetologistController");

Router.get("/", cosmetologistController.getAllCosmetologist);
Router.get("/getCosmetologist", cosmetologistController.getCosmetologistById);
Router.post("/createNew", cosmetologistController.createCosmetologist);
Router.delete("/delete", cosmetologistController.deleteCosmetologistById);
Router.post("/update", cosmetologistController.updateCosmetologistById);

module.exports = Router;
