import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "cartSecret",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/", cartRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
