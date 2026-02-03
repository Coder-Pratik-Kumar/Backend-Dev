// const express = require("express");

// const app = express();

// const PORT = 8000;

// app.get("/", (req, res) => {
//     res.send("welcome to home page")
// })

// app.get("/users", (req, res) => {
//     res.send("<h1>This is user page</h1>");
// })

// app.get("/users/:id", (req, res) => {
//     const userID = req.params.id;
//     res.send(`you are requesting for users: ${userID} `);
// })

// app.listen(PORT, () => {
//     console.log(`server is running on port :${PORT}`);
// })
const express=require("express");

const app=express();

const PORT =8000;
app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

app.get("/users",(req,res)=>{
    res.send("<h1>this is users page</h1> ")
})
const students=[
    { id: 1, name: "Alice", branch: "CS" },
    
    { id: 2, name: "Bob", branch: "EC" },
    
    { id: 3, name: "Crisi", branch: "EE" },
    
    { id: 4, name: "steve", branch: "ME" }
    
]
app.get("/users/:id",(req,res)=>{
    const userId=req.params.id
    res.send(`You are requesting for User Id:${userId}`)
})
app.get("/students/search", (req, res) => {
    const branch = req.query.branch;
    if (!branch) {
        return res.json(students);
    }
    const foundStudent = students.filter(s => s.branch == branch);
    res.json(foundStudent);
})
app.get("/students",(req,res)=>{
    res.json(students);
})
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const arrayIndex = students.findIndex(s => s.id == id);
    const data = students[arrayIndex];
    res.json(data);
})
app.post("/students/register", (req, res) => {
    const data = req.body;
    students.push(data);
    res.json(students);
})
app.listen(PORT,()=>{
    console.log(`Server is Running on port:${PORT}`)
})