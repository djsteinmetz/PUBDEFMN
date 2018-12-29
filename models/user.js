console.log("models loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  uid: { type: String },
  email: { type: String },
  status: { type: String, required: true },
  notes: { type: String },
  updated: { type: Date, default: Date.now }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
