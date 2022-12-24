const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const studentCoursePaymentSchema = new Schema(
  {
    paymentDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDetails:{
      type: String,
      required:true,
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref:"Student",
      required: true,
    }
  },
  { timestamps: true }
);

const StudentCoursePayment = model("StudentCoursePayment", studentCoursePaymentSchema);
module.exports={StudentCoursePayment}

