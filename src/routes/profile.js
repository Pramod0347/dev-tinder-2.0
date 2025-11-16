const express = require('express');
const userAuth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send('Error : ' + error.message);
    }    
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid edits attempted");
        };

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((field) => (loggedInUser[field] = req.body[field]));

        await loggedInUser.save();
        res.json({
            message: "Profile updated successfully",
            data: loggedInUser
        });
    } catch(error) {
        res.status(400).send('Error' + error.message);
    }
})

profileRouter.patch("/profile/forgot-password", userAuth, async(req, res) => {
    try {
        const { password } = req.body;
        if(!password) {
            throw new Error ("New password is required");
        }

        const loggedInUser = req.user;
        const hashedPassword = await bcrypt.hash(password, 10);
        loggedInUser.password = hashedPassword;
        await loggedInUser.save();

        // Generate a fresh JWT token with the updated user data
        const token = await loggedInUser.getJWT();
        
        // Set the new token in cookies
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.json({
            message: "Password updated successfully",
            data: loggedInUser
        });
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
})

module.exports = profileRouter;