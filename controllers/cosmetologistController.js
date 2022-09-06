const cosmetologist = require("../models/cosmetologist");
const { ObjectId } = require("mongodb");

exports.getAllCosmetologist = async (req, res) => {
  const cosmetologists = await cosmetologist.find();
  console.log("Get all cosmetologists:", cosmetologists);
  res.send(cosmetologists);
};

exports.getCosmetologistById = async (req, res) => {
  console.log("cosmetologistId:", req.query.id);
  const cosmetologistId = new ObjectId(req.query.id);
  console.log(cosmetologistId);
  const cosmetologistDetails = await cosmetologist
    .findOne({ _id: cosmetologistId })
    .then((response) => {
      console.log("cosmetologist Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(cosmetologistDetails);
};

exports.createCosmetologist = async (req, res) => {
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  const cosmetologistObj = {};

  console.log("photo file:", image);
  console.log("received Resort from frontend:", otherDetails);

  if (image) {
    cosmetologistObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    cosmetologistObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  const newCosmetologist = new cosmetologist(cosmetologistObj);

  const responseFromDb = await newCosmetologist
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

exports.deleteCosmetologistById = async (req, res) => {
  console.log("cosmetologistId", req.query.id);
  const cosmetologistId = new ObjectId(req.query.id);
  const responseFromDb = await cosmetologist
    .deleteOne({ _id: cosmetologistId })
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

exports.updateCosmetologistById = async (req, res) => {
  console.log("id:", req.query.id);
  const cosmetologistId = new ObjectId(req.query.id);
  //   const travelAgencyId = req.query.id;
  const updates = req.body;
  console.log("updates:", updates);
  cosmetologist
    .updateOne({ _id: cosmetologistId }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
