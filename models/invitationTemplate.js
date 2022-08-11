const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const template = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("template", template);
