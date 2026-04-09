import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// login page
router.get("/login", (req, res) => {
  res.send(`
        <form method="POST" action="/login">
            Username: <input name="username"><br>
            Password: <input name="password"><br>
            <button>Login</button>
        </form>
    `);
});

// login submit
router.post("/login", login);

// dashboard
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`<h2>Welcome ${req.session.user.username}</h2>
            <a href="/admin">Admin Panel</a><br>
            <a href="/logout">Logout</a>`);
});

// admin panel
router.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.send("<h1>Admin Panel - Only Admin Allowed</h1>");
});

// logout
router.get("/logout", logout);

export default router;