const videographer = require("../models/videographer");

const { ObjectId } = require("mongodb");

exports.getAllVideographers = async (req, res) => {
  const Videographers = await videographer.find();
  console.log("Get all Videographers:", Videographers);
  res.send(Videographers);
};

exports.getVideographerById = async (req, res) => {
  console.log("VideographerId:", req.query.id);
  const videographerId = new ObjectId(req.query.id);
  console.log(videographerId);
  const VideographerDetails = await videographer
    .findOne({ _id: videographerId })
    .then((response) => {
      console.log("Videographer Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(VideographerDetails);
};

exports.createVideographer = async (req, res) => {
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  const videpgrapherObj = {};

  console.log("photo file:", image);
  console.log("received details from frontend:", otherDetails);

  if (image) {
    videpgrapherObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    videpgrapherObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  console.log(videpgrapherObj);

  const newVideographer = new videographer(videpgrapherObj);

  const responseFromDb = await newVideographer
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

exports.deleteVideographerById = async (req, res) => {
  console.log("VideographerId", req.query.id);
  const VideographerId = new ObjectId(req.query.id);
  const responseFromDb = await videographer
    .deleteOne({ _id: VideographerId })
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

exports.updateVideographerById = async (req, res) => {
  console.log("id:", req.query.id);
  const videographerId = req.query.id;

  const updates = req.body;
  console.log("updates:", updates);
  videographer
    .updateOne({ _id: new ObjectId(videographerId) }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
