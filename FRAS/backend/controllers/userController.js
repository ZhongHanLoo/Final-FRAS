const User = require("../models/user");

exports.addUser = (req, res, next) => {
  const user = new User({
    userId: req.body.userId,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    userType: req.body.userType,
    class: req.body.class
  });
  user.save().then((createdUser) => {
    res.status(201).json({
      message: "User added successfully",
      userId: createdUser.id,
    });
  });
};

exports.getAllUser = (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: "Users fetched successfully",
      users: documents,
    });
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "User deleted!",
    });
  });
};

exports.updateUser = (req, res, next) => {
  const user = {
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    userType: req.body.userType,
    class: req.body.class
  };

  User.updateOne({ _id: req.params.id }, user).then((result) => {
    console.log(result);
    res.status(200).json({ message: "User update successfully" });
  });
};

exports.getAllStudent = (req, res, next) => {
  User.find({ userType: "Student"}).then((documents) => {
    res.status(200).json({
      message: "Students fetched successfully",
      users: documents,
    });
  });
};

exports.getAllLecturer = (req, res, next) => {
  User.find({ userType: "Lecturer"}).then((documents) => {
    res.status(200).json({
      message: "Students fetched successfully",
      users: documents,
    });
  });
};

exports.login = (req, res, next) => {
  User.findOne({  userId: req.params.id} ).then((user) => {
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  });
};
