const marriageDetails = require("../models/marriageDetails");
const { ObjectId } = require("mongodb");

exports.setTemplateCardDetails = (req, res) => {
  console.log(req.body);
  const data = req.body.data;
  const userId = req.body.id;
  let updates = { cardDetails: {} };
  if (data) {
    const {
      groomName,
      brideName,
      pincode,
      venue,
      address,
      additionalDetails,
      startDate,
      endDate,
      eventDate,
    } = data;
    console.log(data);
    // console.log(groomName);
    updates.cardDetails.groomName = groomName;
    updates.cardDetails.brideName = brideName;
    updates.cardDetails.pincode = pincode;
    updates.cardDetails.venue = venue;
    updates.cardDetails.address = address;
    updates.cardDetails.additionalDetails = additionalDetails;
    if (eventDate) {
      updates.cardDetails.eventDate = eventDate;
    }
    if (startDate && endDate) {
      updates.cardDetails.startDate = startDate;
      updates.cardDetails.endDate = endDate;
    }
  }
  console.log(userId);
  console.log(" details from frontend:", updates);

  marriageDetails
    .updateOne({ user_id: userId }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });

  res.send(`card details information updated:`);
};

exports.updateMarriageDetails = (req, res) => {
  console.log(req.body);
  const data = req.body;
  const userId = req.body.id;
  console.log("userId:", userId);

  let updates = {};
  if (data.resortId) {
    updates.weddingResort = data.resortId;
  }
  if (data.decoratorId) {
    updates.decorator = data.decoratorId;
  }

  if (data.cosmetologistId) {
    updates.cosmetologist = data.cosmetologistId;
  }
  if (data.photographerId) {
    updates.photographer = data.photographerId;
  }
  if (data.videographerId) {
    updates.videographer = data.videographerId;
  }
  if (data.templateId) {
    updates.invitationTemplate = data.templateId;
  }

  if (data.travelAgencyId) {
    updates.travelAgency = data.travelAgencyId;
  }

  // console.log("userId:", userId);
  console.log(" details from frontend:", updates);

  marriageDetails
    .updateOne({ user_id: userId }, updates)
    .then((response) => {
      console.log("data updated:", response);
    })
    .catch((error) => {
      console.log("error", error);
    });

  res.send(`marriage details information updated:`);
};

exports.setGuests = (req, res) => {
  console.log(req.body);
  const data = req.body.data;
  const userId = req.body.userId;

  console.log(userId);
  console.log(" details from frontend:", data);

  marriageDetails
    .updateOne({ user_id: userId }, { $push: { relatives: data } })
    .then((response) => {
      console.log(response);
      // return response.relatives;
    })
    .catch((error) => {
      console.log(error.message);
    });
  res.send("Guests updated");
};

exports.getGuestList = async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);

  let guestList = await marriageDetails
    .findOne({ user_id: userId })
    .then((response) => {
      console.log(response.relatives);
      return response.relatives;
    })
    .catch((error) => {
      console.log(error.message);
    });
  res.send(guestList);
};

exports.deleteRelative = (req, res) => {
  const indexObjectId = new ObjectId(req.query.id);
  const userId = req.query.userId;
  console.log(userId, "    ", indexObjectId);

  marriageDetails
    .updateOne(
      { user_id: userId },
      { $pull: { relatives: { _id: indexObjectId } } }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });

  res.send("deleted");
};

exports.getAllMarriageDetails = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  const details = await marriageDetails
    .findOne({ user_id: userId })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.message);
    });

  res.send(details);
};
