const express = require("express");
const Router = express.Router();

const decorator = require("../controllers/decoratorController");

Router.get("/", decorator.getAllDecorators);
Router.get("/getDecorator", decorator.getDecoratorById);
Router.post("/createNew", decorator.createDecorator);
Router.delete("/delete", decorator.deleteDecoratorById);
Router.post("/update", decorator.updateDecoratorById);

module.exports = Router;
