const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration:{
        type: Number,
        required: true
    },
    fee:{
        type:Number,
        required:true,
    },
    courseDetails:{
        type: String,
        required:true
    }
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);
module.exports = Course;
