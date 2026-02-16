const express = require('express');
const app = express();

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

app.get('/users', (req, res) => {
    const nameQuery = req.query.name;

    if (nameQuery) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(nameQuery.toLowerCase())
        );
        res.json(filteredUsers);
    } else {
        res.json(users);
    }
});

app.listen(3000);
