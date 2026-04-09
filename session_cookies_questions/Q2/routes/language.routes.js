import express from "express";

const router = express.Router();

// Home page
router.get("/", (req, res) => {

  const messages = {
    en: "Welcome to our website",
    hi: "हमारी वेबसाइट पर आपका स्वागत है",
    fr: "Bienvenue sur notre site"
  };

  res.send(`
        <h1>${messages[req.language]}</h1>

        <a href="/set-language/en">English</a><br>
        <a href="/set-language/hi">Hindi</a><br>
        <a href="/set-language/fr">French</a>
    `);
});

// Set language
router.get("/set-language/:lang", (req, res) => {

  const lang = req.params.lang;

  res.cookie("language", lang, { maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.redirect("/");
});

export default router;