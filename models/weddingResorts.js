const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weddingResort = new Schema({
  name: { type: String, required: true },
  mobile: { type: Number, minlength: 10, maxlength: 10, required: true },
  pincode: { type: Number, minlength: 6, maxLength: 6, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("weddingResort", weddingResort);
