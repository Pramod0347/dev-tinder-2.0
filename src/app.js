const express = require("express");

const app = express();

// This will only handle get calls
app.get("/user", (req, res) => {
    res.send({name: "John", age: 30});
})


app.listen(3000,  () => {
    console.log("Server Listening on 3000");
});

