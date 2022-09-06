const express = require("express");
const Router = express.Router();

const invitationTemplate = require("../controllers/invitationTemplateController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

Router.get("/", invitationTemplate.getAllTemplates);
Router.get("/getTemplate", invitationTemplate.getTemplateById);
Router.post(
  "/createNew",
  upload.single("image"),
  invitationTemplate.createTemplate
);
Router.delete("/delete", invitationTemplate.deleteTemplateById);
Router.post("/update", invitationTemplate.updateTemplateById);

module.exports = Router;
