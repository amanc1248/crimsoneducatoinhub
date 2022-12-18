const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const tutorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age:{
      type: Number,
      required:true,
    },
    qualification: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Tutor = model("Tutor", tutorSchema);
module.exports={Tutor}

