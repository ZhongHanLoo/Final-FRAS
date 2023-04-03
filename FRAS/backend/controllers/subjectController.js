const Subject = require("../models/subject");

exports.addSubject = (req, res, next) => {
  const subject = new Subject({
    subjectCode: req.body.subjectCode,
    name: req.body.name,
  });
  subject.save().then((createdSubject) => {
    res.status(201).json({
      message: "Subject added successfully",
      subjectId: createdSubject.id,
    });
  });
};

exports.getAllSubject = (req, res, next) => {
  Subject.find().then((documents) => {
    res.status(200).json({
      message: "Subjects fetched successfully",
      subjects: documents,
    });
  });
};

exports.getSubject = (req, res, next) => {
  Subject.findById(req.params.id).then((subject) => {
    res.status(200).json({
      message: "Subject fetched successfully",
      subject: subject,
    });
  });
};

exports.deleteSubject = (req, res, next) => {
  Subject.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Subject deleted!",
    });
  });
};

exports.updateSubject = (req, res, next) => {
  const subject = {
    subjectCode: req.body.subjectCode,
    name: req.body.name,
  };

  Subject.updateOne({ _id: req.params.id }, subject).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Subject update successfully" });
  });
};
