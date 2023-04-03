const Attendance = require("../models/attendance");

exports.addAttendance = (req, res, next) => {
  const attendance = new Attendance({
    user: req.body.user,
    attendanceCheck: req.body.attendanceCheck,
  });
  attendance.save().then((createdAttendance) => {
    res.status(201).json({
      message: "Attendance added successfully",
      attendanceId: createdAttendance.id,
    });
  });
};

exports.getAllAttendance = (req, res, next) => {
  Attendance.find().then((documents) => {
    res.status(200).json({
      message: "Attendances fetched successfully",
      attendances: documents,
    });
  });
};

exports.getAttendance = (req, res, next) => {
  Attendance.findById(req.params.id).then((attendance) => {
    res.status(200).json({
      message: "Attendance fetched successfully",
      attendance: attendance,
    });
  });
};

exports.deleteAttendance = (req, res, next) => {
  Attendance.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Attendance deleted!",
    });
  });
};

exports.updateAttendance = (req, res, next) => {
  const attendance = {
    user: req.body.user,
    attendanceCheck: req.body.attendanceCheck,
  };

  Attendance.updateOne({ _id: req.params.id }, attendance).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Attendance update successfully" });
  });
};
