const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  attendanceCheck: { type: Boolean, required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
