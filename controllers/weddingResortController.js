const weddingResort = require("../models/weddingResorts");
const { ObjectId } = require("mongodb");

exports.getAllWeddingResorts = async (req, res) => {
  const weddingResorts = await weddingResort.find();
  console.log("Get all wedding points");
  res.send(weddingResorts);
};

exports.getWeddingResortById = async (req, res) => {
  console.log("weddingResortId:", req.body);
  console.log("weddingResortId:", req.query.id);
  const weddingResortId = new ObjectId(req.query.id);
  console.log(weddingResortId);
  const weddingResortDetails = await weddingResort
    .findOne({ _id: weddingResortId })
    .then((response) => {
      console.log("Resort Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(weddingResortDetails);
};

exports.createWeddingResort = async (req, res) => {
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  const resortObj = {};

  console.log("photo file:", image);
  console.log("received details from frontend:", otherDetails);

  if (image) {
    resortObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    resortObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  console.log(resortObj);

  const newWeddingResort = new weddingResort(resortObj);

  const responseFromDb = await newWeddingResort
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

exports.deleteWeddingResortById = async (req, res) => {
  console.log("weddingResortId", req.query.id);
  const weddingResortId = new ObjectId(req.query.id);
  const responseFromDb = await weddingResort
    .deleteOne({ _id: weddingResortId })
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

exports.updateWeddingResortById = async (req, res) => {
  const weddingResortId = new ObjectId(req.query.ResortId);
  const updates = req.body;
  console.log("updates:", updates);
  weddingResort
    .updateOne({ _id: weddingResortId }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
