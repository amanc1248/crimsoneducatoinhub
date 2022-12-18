const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assignedCourseSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    tutorId:{
        type:mongoose.Types.ObjectId,
        ref: "Tutor",
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
    salary:{
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

const AssignedCourse = model(
  "AssignedCourse",
  assignedCourseSchema
);
module.exports = { AssignedCourse };
