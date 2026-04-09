import express from "express";
import sanitizeMiddleware from "./middleware/sanitize.middleware.js";

const app = express();

app.use(express.json());

// Apply sanitization globally
app.use(sanitizeMiddleware);

app.post("/register", (req, res) => {

    const { name, email } = req.body;

    res.json({
        message: "User registered",
        data: { name, email }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});