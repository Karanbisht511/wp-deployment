const express = require("express");
const Router = express.Router();

const invitation = require("../controllers/invitationController");
const marriageDetail = require("../controllers/marriageEventDetailsController");

Router.get("/", invitation.getAllInvitationTemplatesAndRelativesSaved);
//get all invitation templates present in database and relatives details if present in userInfo collection

Router.post(
  "/saveInvitationTemplatesDetails",
  invitation.saveInvitationTemplateAndRelatives
  // invitation.updateMarriageDetails
); //Save invitation template and relatives in UserInfo

Router.get("/getAllMarriageDetails", marriageDetail.getAllMarriageDetails);
Router.get("/getRelatives", marriageDetail.getGuestList);
Router.post("/updateMarriageDetails", marriageDetail.updateMarriageDetails);
Router.post("/setTemplateCardDetails", marriageDetail.setTemplateCardDetails);
Router.post("/setGuests", marriageDetail.setGuests);
Router.delete("/deleteGuest", marriageDetail.deleteRelative);

// Router.post("/modifyInvitationTemplate", invitation.modifyInvitationTemplate);
// Router.post("/modifyRelativesDetails", invitation.modifyRelativesDetails);
// Router.post("/deleteRelative", invitation.deleteRelative);

module.exports = Router;
