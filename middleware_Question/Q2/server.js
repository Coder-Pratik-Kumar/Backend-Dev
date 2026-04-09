import express from "express";
import jwt from "jsonwebtoken";
import verifyMFA from "./middleware/mfaMiddleware.js";

const app = express();

app.use(express.json());

// login route
app.post("/login", (req, res) => {
    const user = { id: 1, name: "Pratik" };

    const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });

    res.json({
        token,
        otp: "123456" // normally sent to email/SMS
    });
});

// sensitive route
app.post("/transfer-money", verifyMFA, (req, res) => {
    res.json({
        message: "Money transferred successfully",
        user: req.user
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});