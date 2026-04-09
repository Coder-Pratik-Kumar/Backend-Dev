export const login = (req, res) => {

  const { username, password } = req.body;

  // Demo users
  const users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "pratik", password: "123", role: "user" }
  ];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.send("Invalid credentials");
  }

  // store user in session
  req.session.user = user;

  res.redirect("/dashboard");
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};