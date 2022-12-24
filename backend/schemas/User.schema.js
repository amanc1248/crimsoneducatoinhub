const mongoose  = require('mongoose')
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    position:{
      type: String,
      required:true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hashedPassword:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports={User}

