const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const tutorCoursePaymentSchema = new Schema(
  {
    assignedCourseId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"AssignedCourse"
    },
    tutorId: {
        type: mongoose.Types.ObjectId,
        ref:"Tutor",
        required: true,
      },
    salaryDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    
    salaryDetails:{
      type: String,
      required:true,
    },
    chequePhoto:{
        type:String,
        required:true,
    }
  },
  { timestamps: true }
);

const TutorCoursePayment = model("TutorCoursePayment", tutorCoursePaymentSchema);
module.exports={TutorCoursePayment}

