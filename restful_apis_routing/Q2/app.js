const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let books = [];
let nextId = 1;

const validateYear = (req, res, next) => {
    const { year } = req.body;

    if (!year || isNaN(year)) {
        return res.status(400).json({
            error: "Year must be a valid number"
        });
    }

    if (year < 1000 || year > new Date().getFullYear()) {
        return res.status(400).json({
            error: "Year must be between 1000 and current year"
        });
    }

    next();
};

app.post('/api/books', validateYear, (req, res) => {
    const { title, author, year } = req.body;

    const newBook = {
        id: nextId++,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(PORT, () => {
    console.log(`Exercise 2 running on port ${PORT}`);
});
