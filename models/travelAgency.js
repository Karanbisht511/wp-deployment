const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelAgency = new Schema({
  name: { type: String, required: true },
  mobile: { type: Number, minLength: 10, maxLength: 10, required: true },
  pincode: { type: Number, minLength: 6, maxLength: 6, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("travelAgency", travelAgency);
