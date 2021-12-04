const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    IsAdmin: {
      type: Boolean, default :false
    },
  },
  {
    timestamps: true,
  }
);
const usermodel = mongoose.model("users", UserSchema);
module.exports = usermodel;
