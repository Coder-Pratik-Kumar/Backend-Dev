const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/gallery', (req, res) => {

    const images = ['img1.jpg', 'img2.jpg'];

    res.render('gallery', { images });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
