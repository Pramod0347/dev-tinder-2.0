explore routing and use of ?, +, *, () in the routes
    - app.use vs app.all
    - middlewares


API LIST

    authRouter
    - POST /signup
    - POST /login
    - POST /logout

    profileRouter
    - GET /profile/view
    - PATCH /profile/edit
    - PATCH /profile/password

    connectionRequestRouter
    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId
    - POST /request/review/accepted/:requestedId
    - POST /request/review/rejected/:requestedId

    userRouter
    - Get /uses/connections
    - Get /user/requests
    - Get /user/feed



Status: ignore, interested, accepted, rejected
