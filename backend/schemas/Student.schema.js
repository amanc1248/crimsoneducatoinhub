const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber:{
      type: Number,
      required:true,
    },
    qualification: {
      type: String,
      required: true,
    },
    parentPhoneNumber: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);
module.exports={Student}

