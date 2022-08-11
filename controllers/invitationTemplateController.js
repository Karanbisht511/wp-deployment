const invitaionTemplate = require("../models/invitationTemplate");
const { ObjectId } = require("mongodb");

exports.getAllTemplates = async (req, res) => {
  const InvitaionTemplates = await invitaionTemplate.find();
  console.log("Get all InvitaionTemplates:", InvitaionTemplates);
  res.send(InvitaionTemplates);
};

exports.getTemplateById = async (req, res) => {
  console.log("InvitationTemplateId:", req.query.id);
  const invitaionTemplateId = new ObjectId(req.query.id);
  console.log(invitaionTemplateId);
  const InvitaionTemplateDetails = await invitaionTemplate
    .findOne({ _id: invitaionTemplateId })
    .then((response) => {
      console.log("InvitaionTemplate Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(InvitaionTemplateDetails);
};

exports.createTemplate = async (req, res) => {
  console.log("received InvitaionTemplate from frontend:", req.body);
  const newInvitaionTemplate = new invitaionTemplate(req.body);

  const responseFromDb = await newInvitaionTemplate
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
  console.log("InvitaionTemplateId", req.query.id);
  const InvitaionTemplateId = new ObjectId(req.query.id);
  const responseFromDb = await invitaionTemplate
    .deleteOne({ _id: InvitaionTemplateId })
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
  const invitaionTemplateId = req.query.id;

  const updates = req.body;
  console.log("updates:", updates);
  invitaionTemplate
    .updateOne({ _id: new ObjectId(invitaionTemplateId) }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
