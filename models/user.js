const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: Number, minLength: 10, maxLength: 10, required: true },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String, minlength: 8, unique: true },
  user_id: { type: ObjectId, required: true },
});

module.exports = mongoose.model("User", userSchema);
