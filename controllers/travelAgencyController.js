const travelAgency = require("../models/travelAgency");
const { ObjectId } = require("mongodb");

exports.getAllTravelAgencies = async (req, res) => {
  const travelAgencies = await travelAgency.find();
  console.log("Get all TravelAgencies:", travelAgencies);
  res.send(travelAgencies);
};

exports.getTravelAgencyById = async (req, res) => {
  console.log("travelAgencyId:", req.query.id);
  const travelAgencyId = new ObjectId(req.query.id);
  console.log(travelAgencyId);
  const travelAgencyDetails = await travelAgency
    .findOne({ _id: travelAgencyId })
    .then((response) => {
      console.log("travelAgency Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(travelAgencyDetails);
};

exports.createTravelAgency = async (req, res) => {
  console.log("received Resort from frontend:", req.body);
  const newtravelAgency = new travelAgency(req.body);

  const responseFromDb = await newtravelAgency
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

exports.deleteTravelAgencyById = async (req, res) => {
  console.log("travelAgencyId", req.query.id);
  const travelAgencyId = new ObjectId(req.query.id);
  const responseFromDb = await travelAgency
    .deleteOne({ _id: travelAgencyId })
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

exports.updateTravelAgencyById = async (req, res) => {
  console.log("id:", req.query.id);
  const travelAgencyId = new ObjectId(req.query.id);
  //   const travelAgencyId = req.query.id;
  const updates = req.body;
  console.log("updates:", updates);
  travelAgency
    .updateOne({ _id: travelAgencyId }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
