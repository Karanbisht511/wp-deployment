const decorator = require("../models/decorator");
const { ObjectId } = require("mongodb");

exports.getAllDecorators = async (req, res) => {
  const Decorators = await decorator.find();
  console.log("Get all Decorators:", Decorators);
  res.send(Decorators);
};

exports.getDecoratorById = async (req, res) => {
  console.log("DecoratorId:", req.query.id);
  const decoratorId = new ObjectId(req.query.id);
  console.log(decoratorId);
  const DecoratorDetails = await decorator
    .findOne({ _id: decoratorId })
    .then((response) => {
      console.log("Decorator Details:", response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!.\n Please check backend console.";
    });
  res.send(DecoratorDetails);
};

exports.createDecorator = async (req, res) => {
  const image = req.file;
  const otherDetails = JSON.parse(req.body.details);
  const decoratorObj = {};

  console.log("photo file:", image);
  console.log("received decorators details from frontend:", otherDetails);

  if (image) {
    decoratorObj.image = image;
  } else {
    res.send("image is required");
  }

  if (otherDetails) {
    decoratorObj.details = otherDetails;
  } else {
    res.send("All field should be filled");
  }

  const newDecorator = new decorator(decoratorObj);

  const responseFromDb = await newDecorator
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

exports.deleteDecoratorById = async (req, res) => {
  console.log("DecoratorId", req.query.id);
  const DecoratorId = new ObjectId(req.query.id);
  const responseFromDb = await decorator
    .deleteOne({ _id: DecoratorId })
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

exports.updateDecoratorById = async (req, res) => {
  console.log("id:", req.query.id);
  const decoratorId = req.query.id;

  const updates = req.body;
  console.log("updates:", updates);
  decorator
    .updateOne({ _id: new ObjectId(decoratorId) }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
