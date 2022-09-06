const express = require("express");
const Router = express.Router();

const weddingResortController = require("../controllers/weddingResortController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", weddingResortController.getAllWeddingResorts);
Router.get("/getResort", weddingResortController.getWeddingResortById);
Router.post(
  "/createNew",
  upload.single("image"),
  weddingResortController.createWeddingResort
);
Router.delete("/delete", weddingResortController.deleteWeddingResortById);
Router.post("/update", weddingResortController.updateWeddingResortById);

module.exports = Router;
