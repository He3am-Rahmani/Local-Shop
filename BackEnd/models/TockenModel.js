const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tockenSchema = new Schema({
  url: { type: String, required: true },
  isValid: { defaultStatus:true,type: Boolean, required: true },
  for:{type:Object ,required:true},
  createdDate:{type:Date , required:true},
  usedIn:{type:Date}
});

module.exports = mongoose.model("tocken", tockenSchema);


