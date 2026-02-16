const express = require('express');
const app = express();

const PORT = 3000;


app.use((req, res, next) => {

    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`${req.method} ${req.url} - ${duration} ms`);
    });

    next();
});

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
