const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const template = new Schema({
  details: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  image: { type: Object, required: true },
});

module.exports = mongoose.model("template", template);
