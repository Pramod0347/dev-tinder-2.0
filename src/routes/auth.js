const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");




const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;

    const userData = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await userData.save();
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("Error signing up user: " + error.message);
  }
});

authRouter.post("/login", async(req, res) => {
  try {
    const {emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId});


    if(!user) {
      throw new Error("use not found");
    }

    const isPassowrdValid = await user.validatePassword(password);

    if(isPassowrdValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000)
      }); 
      res.send("User logged in successfully");
    } else {
      throw new Error ("Invalid password");
    }
 


  } catch (error) {
    res.status(500).send("Error logging in user: " + error.message);
  }
})

module.exports = authRouter;