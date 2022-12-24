const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const shiftSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime:{
      type: Number,
      required:true,
    }
  },
  { timestamps: true }
);

const Shift = model("Shift", shiftSchema);
module.exports={Shift}

