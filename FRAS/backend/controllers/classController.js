const Class = require("../models/class");

exports.addClass = (req, res, next) => {
  const theClass = new Class({
    name: req.body.name,
    subject: req.body.subject,
    sessionList: req.body.sessionList,
    studentList: req.body.studentList,
    lecturer: req.body.lecturer,
  });
  theClass.save().then((createdClass) => {
    res.status(201).json({
      message: "Class added successfully",
      classId: createdClass.id,
    });
  });
};

exports.getAllClass = (req, res, next) => {
  Class.find().populate("subject").populate("lecturer").then((documents) => {
    res.status(200).json({
      message: "Classes fetched successfully",
      classes: documents,
    });
  });
};

exports.getClass = (req, res, next) => {
  Class.findById(req.params.id)
    .populate("sessionList")
    .populate("studentList")
    .then((theClass) => {
      res.status(200).json({
        message: "Class fetched successfully",
        class: theClass,
      });
    });
};

exports.deleteClass = (req, res, next) => {
  Class.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Class deleted!",
    });
  });
};

exports.updateClass = (req, res, next) => {
  const theClass = {
    name: req.body.name,
    subject: req.body.subject,
    sessionList: req.body.sessionList,
    studentList: req.body.studentList,
    lecturer: req.body.lecturer,
  };

  Class.updateOne({ _id: req.params.id }, theClass).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Class update successfully" });
  });
};

exports.getClassByLecturer = (req, res, next) => {
  Class.find({ lecturer: req.params.id }).populate("subject").populate("sessionList").populate("studentList").then((documents) => {
    res.status(200).json({
      message: "Classes fetched successfully",
      classes: documents,
    });
  });
};
