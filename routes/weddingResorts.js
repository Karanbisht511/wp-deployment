const express = require("express");
const Router = express.Router();

const weddingResortController = require("../controllers/weddingResortController");

Router.get("/", weddingResortController.getAllWeddingResorts);
Router.get("/getResort", weddingResortController.getWeddingResortById);
Router.post("/createNew", weddingResortController.createWeddingResort);
Router.delete("/delete", weddingResortController.deleteWeddingResortById);
Router.post("/update", weddingResortController.updateWeddingResortById);

module.exports = Router;
