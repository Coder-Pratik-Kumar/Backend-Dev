import express from "express";
const router = express.Router();

// Step 1 Page
router.get("/step1", (req, res) => {
  res.sendFile(process.cwd() + "/views/step1.html");
});

// Step 1 Submit
router.post("/step1", (req, res) => {
  req.session.user = {
    name: req.body.name,
    email: req.body.email
  };

  res.redirect("/step2");
});

// Step 2 Page
router.get("/step2", (req, res) => {
  res.sendFile(process.cwd() + "/views/step2.html");
});

// Step 2 Submit
router.post("/step2", (req, res) => {

  req.session.user.age = req.body.age;
  req.session.user.city = req.body.city;

  res.redirect("/success");
});

// Final Page
router.get("/success", (req, res) => {

  const userData = req.session.user;

  res.send(`
        <h1>Registration Complete</h1>
        <p>Name: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        <p>Age: ${userData.age}</p>
        <p>City: ${userData.city}</p>
    `);
});

export default router;