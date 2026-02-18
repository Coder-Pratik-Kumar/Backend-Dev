const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "1984", author: "George Orwell", year: 1949 },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 }
];

// GET /api/books/search?title=great
app.get('/api/books/search', (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({
            error: "Title query parameter required"
        });
    }

    const result = books.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Exercise 5 running on port ${PORT}`);
});
