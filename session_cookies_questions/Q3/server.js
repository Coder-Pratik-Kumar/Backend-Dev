import express from "express";
import session from "express-session";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", adminRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});