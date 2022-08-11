const photographer = require("../models/photographer");
const { ObjectId } = require("mongodb");

exports.getAllPhotographers = async (req, res) => {
  const Photographers = await photographer.find();
  console.log("Get all Photographers:", Photographers);
  res.send(Photographers);
};

exports.getPhotographerById = async (req, res) => {
  console.log("PhotographerId:", req.query.id);
  const photographerId = new ObjectId(req.query.id);
  console.log(photographerId);
  const PhotographerDetails = await photographer
    .findOne({ _id: photographerId })
    .then((response) => {
      console.log("Photographer Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(PhotographerDetails);
};

exports.createPhotographer = async (req, res) => {
  console.log("received Photographer from frontend:", req.body);
  const newPhotographer = new photographer(req.body);

  const responseFromDb = await newPhotographer
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

exports.deletePhotographerById = async (req, res) => {
  console.log("PhotographerId", req.query.id);
  const PhotographerId = new ObjectId(req.query.id);
  const responseFromDb = await photographer
    .deleteOne({ _id: PhotographerId })
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

exports.updatePhotographerById = async (req, res) => {
  console.log("id:", req.query.id);
  const photographerId = req.query.id;

  const updates = req.body;
  console.log("updates:", updates);
  photographer
    .updateOne({ _id: new ObjectId(photographerId) }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
