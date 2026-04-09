import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    loginTime: Date,
    logoutTime: Date,
    lastActive: Date
});

// middleware to update last active
userSchema.pre("save", function(next) {
    this.lastActive = new Date();
    next();
});

// login tracker
userSchema.methods.recordLogin = function () {
    this.loginTime = new Date();
    this.lastActive = new Date();
    return this.save();
};

// logout tracker
userSchema.methods.recordLogout = function () {
    this.logoutTime = new Date();
    this.lastActive = new Date();
    return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;