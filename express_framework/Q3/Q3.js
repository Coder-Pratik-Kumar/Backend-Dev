const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    res.send("Form submitted successfully!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
