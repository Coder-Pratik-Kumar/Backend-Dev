const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "1984", author: "George Orwell", year: 1949 },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 }
];

app.get('/api/books', (req, res) => {
    const { author, year } = req.query;

    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(
            b => b.author.toLowerCase() === author.toLowerCase()
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(
            b => b.year === parseInt(year)
        );
    }

    res.json(filteredBooks);
});

app.listen(PORT, () => {
    console.log(`Exercise 1 running on port ${PORT}`);
});
