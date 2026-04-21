const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: false
}));

const users = [
    { id: 1, username: "user1", role: "user" },
    { id: 2, username: "mod1", role: "moderator" },
    { id: 3, username: "admin1", role: "admin" }
];

const posts = [];

//  Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Unauthorized: Please login"
        });
    }
    next();
};

//  Role-Based Authorization Middleware
const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Admin can access everything
        if (user.role === 'admin') {
            return next();
        }

        if (user.role !== role) {
            return res.status(403).json({
                error: `Forbidden: ${role} role required`
            });
        }

        next();
    };
};

//  Ownership or Moderator/Admin Check
const isOwnerOrModerator = (req, res, next) => {
    const user = req.session.user;
    const postId = parseInt(req.params.id);

    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    // Owner can edit
    if (post.userId === user.id) {
        return next();
    }

    // Moderator/Admin can edit any post
    if (user.role === 'moderator' || user.role === 'admin') {
        return next();
    }

    return res.status(403).json({
        error: "Forbidden: Not allowed to modify this post"
    });
};

//  Create Post
app.post('/posts', isAuthenticated, (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    const newPost = {
        id: posts.length + 1,
        content,
        userId: req.session.user.id
    };

    posts.push(newPost);

    return res.status(201).json({
        message: "Post created",
        post: newPost
    });
});

//  Update Post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    const { content } = req.body;
    const postId = parseInt(req.params.id);

    const post = posts.find(p => p.id === postId);

    post.content = content || post.content;

    return res.status(200).json({
        message: "Post updated",
        post
    });
});

//  Delete Post (Moderator/Admin only)
app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
    const postId = parseInt(req.params.id);

    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ error: "Post not found" });
    }

    const deletedPost = posts.splice(index, 1);

    return res.status(200).json({
        message: "Post deleted",
        post: deletedPost[0]
    });
});

app.post('/login', (req, res) => {
    const { userId } = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    req.session.user = user;

    return res.status(200).json({
        message: "Logged in",
        user
    });
});


app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});