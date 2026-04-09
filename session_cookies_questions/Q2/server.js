import express from "express";
import cookieParser from "cookie-parser";
import languageRoutes from "./routes/language.routes.js";
import languageMiddleware from "./middleware/language.middleware.js";

const app = express();

app.use(cookieParser());

// Detect language from cookies
app.use(languageMiddleware);

app.use("/", languageRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});