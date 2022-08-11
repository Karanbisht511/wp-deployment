const Async = require("async");

const invitationTemplate = require("../models/invitationTemplate");
const user = require("../models/user");
const marriageDetails = require("../models/marriageDetails");

const { ObjectId } = require("mongodb");

exports.getAllInvitationTemplatesAndRelativesSaved = async (req, res) => {
  const userId = req.query.id;
  // console.log("userId:", userId);
  const finalResult = await Async.parallel([
    function (callback) {
      invitationTemplate
        .find()
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          console.log("error in invitation template:", err);
        });
    },
    function (callback) {
      console.log("userId:", userId);
      marriageDetails
        .find({ user_id: userId })
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          console.log("error in user:", err);
        });
    },
  ])
    .then((results) => {
      console.log("results:", results);
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(finalResult);
};

exports.saveInvitationTemplateAndRelatives = (req, res) => {
  const data = req.body;
  console.log(
    "InvitaionTemplate id and relatives details from frontend:",
    data
  );

  const newMarriageDetails = new marriageDetails(data);
  newMarriageDetails
    .save()
    .then((response) => {
      console.log("data inserted:", response);
    })
    .catch((error) => {
      console.log(error);
    });
  // }
  res.send(`pahunch gayi information:`);
};
