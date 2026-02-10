const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});


const students = [
    { id: 1, name: "Alice", branch: "CS" },
    { id: 2, name: "Abhi", branch: "ECE" },
    { id: 3, name: "Abhiyansh", branch: "Ec" },
    { id: 4, name: "Priyansh", branch: "Cyber" }
];

// ------------------ MIDDLEWARE ------------------

// simple middleware
app.use((req, res, next) => {
  console.log("I am a middleware");
  next();
});


// -------- AUTH MIDDLEWARE --------
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  // Expected format: Bearer mysecrettoken
  const token = authHeader.split(" ")[1];

  if (token !== "mysecrettoken") {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  next(); // allow request
};


// -------- LOGGER MIDDLEWARE --------
const loggerFile = async (req, res, next) => {
  try {
    const log = `Request at: ${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.url}\n`;
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.log(err.message);
    next();
  }
};

// apply logger middleware globally
app.use(loggerFile);


// ------------------ FILE FUNCTIONS ------------------

const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile(
    "./students.json",
    JSON.stringify(records, null, 2)
  );
};


// ------------------ ROUTES ------------------

// Public Route
app.get("/students", async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});


// Protected Route (Auth Required)
app.put("/students/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Empty body not allowed",
      });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex(
      (s) => s.id === userId
    );

    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});


// Protected Route (Auth Required)
app.delete("/students/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex(
      (s) => s.id === userId
    );

    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});
