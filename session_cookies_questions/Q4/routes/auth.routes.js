import express from "express";
const router = express.Router();

// login
router.get("/login", (req, res) => {

  req.session.user = "Pratik";

  res.redirect("/dashboard");
});

// dashboard
router.get("/dashboard", (req, res) => {

  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.sendFile(process.cwd() + "/views/dashboard.html");
});

// extend session
router.get("/extend-session", (req, res) => {

  req.session.touch(); // refresh session timer

  res.json({ message: "Session extended" });
});

// logout
router.get("/logout", (req, res) => {

  req.session.destroy(() => {
    res.send("Session expired. Please login again.");
  });
});

export default router;