const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'passport-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const JWT_SECRET = 'jwt-secret';

const users = [
    { id: 1, username: "john", password: "123456" }
];

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user || false);
});

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return done(null, false);
        return done(null, user);
    }
));

passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    (payload, done) => {
        const user = users.find(u => u.id === payload.id);
        if (!user) return done(null, false);
        return done(null, user);
    }
));

app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) return res.status(500).json({ error: "Server error" });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        req.login(user, (err) => {
            if (err) return res.status(500).json({ error: "Login failed" });
            return res.json({ message: "Logged in (session)" });
        });
    })(req, res, next);
});

app.post('/auth/api-login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) return res.status(500).json({ error: "Server error" });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ token });
    })(req, res, next);
});

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({ message: "Dashboard access", user: req.user });
});

app.get('/api/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ message: "Profile data", user: req.user });
    }
);

app.listen(3000);