const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdBy: {type:String,required:true},
  creatorRole: {type:String,required:true},
});

module.exports = mongoose.model("admin", AdminSchema);
