const express = require("express");
const Router = express.Router();

const travelAgencyController = require("../controllers/travelAgencyController");

Router.get("/", travelAgencyController.getAllTravelAgencies);
Router.get("/getTravelAgency", travelAgencyController.getTravelAgencyById);
Router.post("/createNew", travelAgencyController.createTravelAgency);
Router.delete("/delete", travelAgencyController.deleteTravelAgencyById);
Router.post("/update", travelAgencyController.updateTravelAgencyById);

module.exports = Router;
