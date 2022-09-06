const express = require("express");
const Router = express.Router();

const cosmetologistController = require("../controllers/cosmetologistController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", cosmetologistController.getAllCosmetologist);
Router.get("/getCosmetologist", cosmetologistController.getCosmetologistById);
Router.post(
  "/createNew",
  upload.single("image"),
  cosmetologistController.createCosmetologist
);
Router.delete("/delete", cosmetologistController.deleteCosmetologistById);
Router.post("/update", cosmetologistController.updateCosmetologistById);

module.exports = Router;
