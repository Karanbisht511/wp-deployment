const express = require("express");
const Router = express.Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const admin = require("./admin");

const weddingResorts = require("./weddingResorts");
const travelAgency = require("./travelAgency");
const photographer = require("./photographer");
const videographer = require("./videographer");
const decorator = require("./decorator");
const cosmetologist = require("./cosmetologist");
const invitation = require("./invitation");
const invitationTemplate = require("./invitationTemplates");

Router.use("/admin", admin);
// Router.get("/adminLogin", adminController.Login);
// Router.post("/adminSignup", adminController.Signup);

Router.get("/login", userController.Login);
Router.post("/signup", userController.signup);
Router.get("/getUserInfo", userController.getUserInfo);
Router.post("/updateUserInfo", userController.updateUserInformation);

Router.use("/weddingResorts", weddingResorts); //routing to wedding Resort router
Router.use("/travelAgency", travelAgency); //routing to travel Agency router
Router.use("/photographer", photographer); //routing to photographer router
Router.use("/videographer", videographer); //routing to videographer router
Router.use("/decorator", decorator); //routing to decorator router
Router.use("/cosmetologist", cosmetologist); //routing to cosmetologist router
Router.use("/invitation", invitation); //routing to invitation router
Router.use("/invitationTemplate", invitationTemplate); //routing to invitation templates

module.exports = Router;
