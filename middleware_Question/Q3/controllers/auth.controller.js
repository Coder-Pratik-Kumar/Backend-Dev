import User from "../models/user.model.js";

export const login = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.recordLogin();

    res.json({
        message: "Login successful",
        loginTime: user.loginTime
    });
};

export const logout = async (req, res) => {

    const { userId } = req.body;

    const user = await User.findById(userId);

    await user.recordLogout();

    res.json({
        message: "Logout successful",
        logoutTime: user.logoutTime
    });
};