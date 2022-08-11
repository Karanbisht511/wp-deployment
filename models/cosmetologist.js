const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cosmetologist = new Schema({
  name: { type: String, required: true },
  mobile: { type: Number, minLength: 10, maxLength: 10, required: true },
  experience: { type: Number, required: true },
  pincode: { type: Number, minLength: 6, maxLength: 6, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("cosmetologist", cosmetologist);
