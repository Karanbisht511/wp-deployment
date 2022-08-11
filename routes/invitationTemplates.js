const express = require("express");
const Router = express.Router();

const invitationTemplate = require("../controllers/invitationTemplateController");

Router.get("/", invitationTemplate.getAllTemplates);
Router.get("/getTemplate", invitationTemplate.getTemplateById);
Router.post("/createNew", invitationTemplate.createTemplate);
Router.delete("/delete", invitationTemplate.deleteTemplateById);
Router.post("/update", invitationTemplate.updateTemplateById);

module.exports = Router;
