const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userController = require("./controllers/userController");
const subjectController = require("./controllers/subjectController");
const classController = require("./controllers/classController");
const sessionController = require("./controllers/sessionController");
const attendanceController = require("./controllers/attendanceController");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://zhonghanloo:FRAS@cluster0.2bybflq.mongodb.net/FRAS?retryWrites=true&w=majority"
    //"mongodb+srv://saykieran:123@cluster0.tzauktp.mongodb.net/FRAS?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/user", userController.addUser);
app.get("/api/user", userController.getAllUser);
app.get("/api/user/:id", userController.getUser);
app.delete("/api/user/:id", userController.deleteUser);
app.put("/api/user/:id", userController.updateUser);
app.get("/api/userGetAllStudent", userController.getAllStudent);
app.get("/api/userGetAllLecturer", userController.getAllLecturer);
app.post("/api/userLogin", userController.login);
//app.get("/api/user/getLatestUser", userController.getLatestUser);

app.post("/api/subject", subjectController.addSubject);
app.get("/api/subject", subjectController.getAllSubject);
app.get("/api/subject/:id", subjectController.getSubject);
app.delete("/api/subject/:id", subjectController.deleteSubject);
app.put("/api/subject/:id", subjectController.updateSubject);

app.post("/api/class", classController.addClass);
app.get("/api/class", classController.getAllClass);
app.get("/api/class/:id", classController.getClass);
app.delete("/api/class/:id", classController.deleteClass);
app.put("/api/class/:id", classController.updateClass);
app.get("/api/classGetClassByLecturer/:id", classController.getClassByLecturer);

app.post("/api/session", sessionController.addSession);
app.get("/api/session", sessionController.getAllSession);
app.get("/api/session/:id", sessionController.getSession);
app.delete("/api/session/:id", sessionController.deleteSession);
app.put("/api/session/:id", sessionController.updateSession);

app.post("/api/attendance", attendanceController.addAttendance);
app.get("/api/attendance", attendanceController.getAllAttendance);
app.get("/api/attendance/:id", attendanceController.getAttendance);
app.delete("/api/attendance/:id", attendanceController.deleteAttendance);
app.put("/api/attendance/:id", attendanceController.updateAttendance);

module.exports = app;
