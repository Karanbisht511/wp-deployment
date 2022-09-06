const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelAgency = new Schema({
  details: {
    name: { type: String, required: true },
    mobile: { type: Number, minLength: 10, maxLength: 10, required: true },
    pincode: { type: Number, minLength: 6, maxLength: 6, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
  },
  image: { type: Object, required: true },
});

module.exports = mongoose.model("travelAgency", travelAgency);
