const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Discount = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("discount", Discount);
