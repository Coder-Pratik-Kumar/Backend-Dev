import User from "../models/user.model.js";

export const getUsers = async (req, res) => {

    const users = await User.find();

    res.json(users);
};

export const deleteUser = async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.softDelete();

    res.json({ message: "User soft deleted" });
};