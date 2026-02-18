const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let authors = [
    { id: 1, name: "George Orwell", country: "UK" },
    { id: 2, name: "Harper Lee", country: "USA" }
];

let nextId = 3;


app.post('/api/authors', (req, res) => {
    const { name, country } = req.body;

    const newAuthor = {
        id: nextId++,
        name,
        country
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});


app.get('/api/authors', (req, res) => {
    res.json(authors);
});


app.get('/api/authors/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);

    if (!author)
        return res.status(404).json({ error: "Author not found" });

    res.json(author);
});


app.put('/api/authors/:id', (req, res) => {
    const index = authors.findIndex(a => a.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ error: "Author not found" });

    authors[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(authors[index]);
});


app.delete('/api/authors/:id', (req, res) => {
    const index = authors.findIndex(a => a.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ error: "Author not found" });

    const deleted = authors.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(PORT, () => {
    console.log(`Exercise 4 running on port ${PORT}`);
});
