const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Comments = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  photoURL: { type: String },
  product: { type: String, required: true },
  replys: { type: Array },
  isVerified: { type: Boolean, defaultStatus: false },
});

module.exports = mongoose.model("comments", Comments);
