const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      const allowedGenders = ["male", "female", "other"];
      if (!allowedGenders.includes(value.toLowerCase())) {
        throw new Error("Invelid gender");
      }
    },
  },
  photoUrl: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
