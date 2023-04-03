const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  sessionList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

module.exports = mongoose.model("Class", classSchema);
