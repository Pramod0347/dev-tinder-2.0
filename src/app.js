const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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


app.post("/login", async(req, res) => {
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

app.get("/profile", userAuth, async(req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).send("Error fetching profile: " + error.message);
  }
})

app.get("/feed", async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server Listening on 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
