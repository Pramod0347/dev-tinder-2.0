const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const userData = new User({
        firstName: "Pramod",
        lastName: "Goudar",
        emailId: "pgoudar347@gmail.com",
        password: "securepassword",
        age: 25,
    })


    try {
        await userData.save();
        res.send("User signed up successfully");
    } catch(error){
        res.status(500).send("Error signing up user: " + error.message);
    }
})

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
