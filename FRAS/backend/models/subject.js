const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  subjectCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
