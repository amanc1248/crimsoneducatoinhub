const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const enrolledCourseSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    studentId:{
        type:mongoose.Types.ObjectId,
        ref: "Student",
        required: true, 
    },
    shiftId:{
        type:mongoose.Types.ObjectId,
        ref: "Shift",
        required: true,
    },
    year:{
        type:Number,
        required: true,
    },
    month:{
        type:Number,
        required: true,
    },
    startDate:{
        type:Number,
        required: true,
    },
    endDate:{
        type:Number,
        required: true,
    },
    coursePrice:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

const EnrolledCourse = model(
  "EnrolledCourse",
  enrolledCourseSchema
);
module.exports = { EnrolledCourse };
