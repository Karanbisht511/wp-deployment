const invitationTemplate = require("../models/invitationTemplate");
const { ObjectId } = require("mongodb");

exports.getAllTemplates = async (req, res) => {
  const invitationTemplates = await invitationTemplate.find();
  console.log("Get all invitationTemplates:", invitationTemplates);
  res.send(invitationTemplates);
};

exports.getTemplateById = async (req, res) => {
  console.log("InvitationTemplateId:", req.query.id);
  const invitationTemplateId = new ObjectId(req.query.id);
  console.log(invitationTemplateId);
  const invitationTemplateDetails = await invitationTemplate
    .findOne({ _id: invitationTemplateId })
    .then((response) => {
      console.log("invitationTemplate Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(invitationTemplateDetails);
};

exports.createTemplate = async (req, res) => {
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  const templateObj = {};

  console.log("photo file:", image);
  console.log("received details from frontend:", otherDetails);

  if (image) {
    templateObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    templateObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  console.log(templateObj);

  const newinvitationTemplate = new invitationTemplate(templateObj);

  const responseFromDb = await newinvitationTemplate
    .save()
    .then((response) => {
      console.log("data inserted:", response);
      return "data inserted successfully";
    })
    .catch((error) => {
      console.log(error);
      return "unexpected error!.\n Please check backend console.";
    });

  res.send(responseFromDb);
};

exports.deleteTemplateById = async (req, res) => {
  console.log("invitationTemplateId", req.query.id);
  const invitationTemplateId = new ObjectId(req.query.id);
  const responseFromDb = await invitationTemplate
    .deleteOne({ _id: invitationTemplateId })
    .then((response) => {
      console.log("data deleted:", response);
      return "data deleted successfully";
    })
    .catch((error) => {
      console.log("error", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(responseFromDb);
};

exports.updateTemplateById = async (req, res) => {
  console.log("id:", req.query.id);
  const invitationTemplateId = req.query.id;

  const updates = req.body;
  console.log("updates:", updates);
  invitationTemplate
    .updateOne({ _id: new ObjectId(invitationTemplateId) }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
