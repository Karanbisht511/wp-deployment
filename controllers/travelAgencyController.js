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
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  // console.log("received Resort from frontend:", req.body);
  const agencyObj = {};

  console.log("photo file:", image);
  console.log("received travel agency from frontend:", otherDetails);

  if (image) {
    agencyObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    agencyObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  console.log(agencyObj);

  const newtravelAgency = new travelAgency(agencyObj);

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
