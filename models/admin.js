const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { required: true, type: String, minlength: 6, unique: true },
});

module.exports = mongoose.model("Admin", adminSchema);
