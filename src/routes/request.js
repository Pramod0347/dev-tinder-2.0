const express = require('express');
const userAuth = require('../middlewares/auth');


const requestRouter = express.Router();


requestRouter.post('/sendConnectionRequest', userAuth, async (requestRouter, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + 'Sent the connect request');
    } catch (error) {
        res.status(500).send("Error sending connection request: " + error.message);
    }
});


module.exports = requestRouter;