const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [
    { id: 1, title: "First Post", content: "Hello Blog!" },
    { id: 2, title: "Second Post", content: "Express is easy!" }
];


app.get('/posts', (req, res) => {
    res.render('posts', { posts });
});


app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('post', { post });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    posts.push({
        id: posts.length + 1,
        title,
        content
    });

    res.redirect('/posts');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
