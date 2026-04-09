import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 60 * 1000   // session expires in 5 minutes
    }
  })
);

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});