const Session = require("../models/session");

exports.addSession = (req, res, next) => {
  const session = new Session({
    name: req.body.name,
    date: req.body.date,
    attendanceReport: req.body.attendanceReport,
  });
  session.save().then((createdSession) => {
    res.status(201).json({
      message: "Session added successfully",
      sessionId: createdSession.id,
    });
  });
};

exports.getAllSession = (req, res, next) => {
  Session.find().then((documents) => {
    res.status(200).json({
      message: "Sessions fetched successfully",
      sessions: documents,
    });
  });
};

exports.getSession = (req, res, next) => {
  Class.findById(req.params.id).populate("attendanceReport").then((session) => {
    res.status(200).json({
      message: "Session fetched successfully",
      session: session,
    });
  });
};

exports.deleteSession = (req, res, next) => {
  Session.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Session deleted!",
    });
  });
};

exports.updateSession = (req, res, next) => {
  const session = {
    name: req.body.name,
    date: req.body.date,
    attendanceReport: req.body.attendanceReport,
  };

  Session.updateOne({ _id: req.params.id }, session).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Session update successfully" });
  });
};
