import express from "express";
import session from "express-session";
import formRoutes from "./routes/form.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/", formRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});