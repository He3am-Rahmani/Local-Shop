const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  joinDate: { type: Date, required: true },
  comments: { type: Array, required: false },
  cartItems: { type: Array, required: false },
  photoURL: { type: String, required: false },
  haveContactToken: { type: Boolean, required: true },
});

module.exports = mongoose.model("user", UserSchema);
