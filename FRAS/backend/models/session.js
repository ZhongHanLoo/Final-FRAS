const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  attendanceReport: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
});

module.exports = mongoose.model("Session", sessionSchema);
