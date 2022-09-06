const express = require("express");
const Router = express.Router();

const decorator = require("../controllers/decoratorController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", decorator.getAllDecorators);
Router.get("/getDecorator", decorator.getDecoratorById);
Router.post("/createNew", upload.single("image"), decorator.createDecorator);
Router.delete("/delete", decorator.deleteDecoratorById);
Router.post("/update", decorator.updateDecoratorById);

module.exports = Router;
