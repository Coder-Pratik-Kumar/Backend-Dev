const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let books = [
    { id: 1, title: "Book A", author: "Author 1", year: 2001 },
    { id: 2, title: "Book B", author: "Author 2", year: 2002 },
    { id: 3, title: "Book C", author: "Author 3", year: 2003 },
    { id: 4, title: "Book D", author: "Author 4", year: 2004 },
    { id: 5, title: "Book E", author: "Author 5", year: 2005 }
];

app.get('/api/books', (req, res) => {
    let { page = 1, limit = 2 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    res.json({
        page,
        limit,
        total: books.length,
        data: books.slice(start, end)
    });
});

app.listen(PORT, () => {
    console.log(`Exercise 3 running on port ${PORT}`);
});
