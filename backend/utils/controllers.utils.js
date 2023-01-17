const { ObjectId } = require("mongodb");
const { AssignedCourse } = require("../schemas/AssignedCourse.schema");
const { EnrolledCourse } = require("../schemas/EnrolledCourse.schema");
const { Shift } = require("../schemas/Shift.schema");
const { Student } = require("../schemas/Student.schema");
const {
  StudentCoursePayment,
} = require("../schemas/StudentCoursePayment.schema");
const { Tutor } = require("../schemas/Tutor.schema");
const { TutorCoursePayment } = require("../schemas/TutorCoursePayment.schema");
const { User } = require("../schemas/User.schema");

 const modelMapper = (collectionName) => {
  const arr = [
    AssignedCourse,
    Course,
    EnrolledCourse,
    Shift,
    Student,
    StudentCoursePayment,
    Tutor,
    TutorCoursePayment,
    User,
  ];
  const mapper = [
    "AssignedCourse",
    "Course",
    "EnrolledCourse",
    "Shift",
    "Student",
    "StudentCoursePayment",
    "Tutor",
    "TutorCoursePayment",
    "User",
  ];
  let model = arr[mapper.indexOf(collectionName)];
  return model;
};

 const convertToObjectIDs = (obj) => {
  for (let data of Object.keys(obj)) {
    if (data.toLowerCase().includes("id")) {
      obj[data] = ObjectId(obj[data]);
    }
  }
  return obj;
};
module.exports={
  modelMapper,
  convertToObjectIDs
}