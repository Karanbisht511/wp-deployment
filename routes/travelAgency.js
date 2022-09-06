const express = require("express");
const Router = express.Router();

const travelAgencyController = require("../controllers/travelAgencyController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", travelAgencyController.getAllTravelAgencies);
Router.get("/getTravelAgency", travelAgencyController.getTravelAgencyById);
Router.post(
  "/createNew",
  upload.single("image"),
  travelAgencyController.createTravelAgency
);
Router.delete("/delete", travelAgencyController.deleteTravelAgencyById);
Router.post("/update", travelAgencyController.updateTravelAgencyById);

module.exports = Router;
