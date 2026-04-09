import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/softdeleteDB")
.then(()=>console.log("MongoDB Connected"));

app.use("/api", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});