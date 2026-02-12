const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

const readStudentsFromFile = async () => {
    try {
        const data = await fs.readFile("./students.json", "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveStudentsToFile = async (students) => {
    await fs.writeFile(
        "./students.json",
        JSON.stringify(students, null, 2)
    );
};

// Serve static HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.post("/students/register", async (req, res) => {
    const { name, branch } = req.body;
  
    console.log("Student Data:", req.body);
    const students = await readStudentsFromFile();
    students.push({ name, branch });

    await saveStudentsToFile(students);

    res.redirect("/");
});

app.listen(3000, () =>
    console.log("Server running at http://localhost:3000")
);
