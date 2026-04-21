const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [
    { email: "john@example.com", password: bcrypt.hashSync("SecurePass123!", 10) }
];

const loginAttempts = new Map();

function checkLoginAttempts(email) {
    const data = loginAttempts.get(email);

    if (!data) return { allowed: true };

    if (data.lockUntil && Date.now() < data.lockUntil) {
        return { allowed: false, message: "Account locked. Try again later" };
    }

    if (data.count >= 5 && Date.now() - data.firstAttemptTime < 60 * 60 * 1000) {
        data.lockUntil = Date.now() + 30 * 60 * 1000;
        loginAttempts.set(email, data);
        return { allowed: false, message: "Too many attempts. Account locked for 30 minutes" };
    }

    if (Date.now() - data.firstAttemptTime > 60 * 60 * 1000) {
        loginAttempts.delete(email);
        return { allowed: true };
    }

    return { allowed: true };
}

function recordFailedAttempt(email) {
    const data = loginAttempts.get(email);

    if (!data) {
        loginAttempts.set(email, {
            count: 1,
            firstAttemptTime: Date.now(),
            lockUntil: null
        });
    } else {
        data.count += 1;
        loginAttempts.set(email, data);
    }
}

function clearAttempts(email) {
    loginAttempts.delete(email);
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    const attemptCheck = checkLoginAttempts(email);
    if (!attemptCheck.allowed) {
        return res.status(429).json({ error: attemptCheck.message });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        recordFailedAttempt(email);
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        recordFailedAttempt(email);
        return res.status(401).json({ error: "Invalid credentials" });
    }

    clearAttempts(email);

    res.json({ message: "Login successful" });
});

app.listen(3000);