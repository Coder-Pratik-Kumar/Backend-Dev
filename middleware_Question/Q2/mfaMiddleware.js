import jwt from "jsonwebtoken";

const verifyMFA = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const otp = req.headers["x-otp"]; // OTP sent in header

    if (!token) {
        return res.status(401).json({ message: "JWT Token missing" });
    }

    if (!otp) {
        return res.status(401).json({ message: "OTP missing" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");

        // Example OTP validation (normally stored in DB or Redis)
        const validOtp = "123456";

        if (otp !== validOtp) {
            return res.status(403).json({ message: "Invalid OTP" });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default verifyMFA;