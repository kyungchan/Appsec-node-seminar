const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String },
  contact: { type: String },
  at: { type: String },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("user", userSchema);
