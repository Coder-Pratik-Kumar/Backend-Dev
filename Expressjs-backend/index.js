const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
    res.send("welcome to home page")
})

app.get("/users", (req, res) => {
    res.send("<h1>This is user page</h1>");
})

app.get("/users/:id", (req, res) => {
    const userID = req.params.id;
    res.send(`you are requesting for users: ${userID} `);
})

app.listen(PORT, () => {
    console.log(`server is running on port :${PORT}`);
})