const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  

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
  skills: {
    type: [String],
    default: ["Engineer"],
  },
  about: {
    type: String,
  }
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id}, "Pramod@347", { expiresIn: "1h"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isValidPassword = await bcrypt.compare (passwordInputByUser, passwordHash);
    return isValidPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
