import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
});