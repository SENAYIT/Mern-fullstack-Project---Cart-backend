// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  return res.send("Hello, World!"); // it shows this in the Server running on http://localhost:3000 if you open in teh browser
});

app.get("/hello", (req, res) => {
  res.send("Hello from the backend!"); // it can show this in the Server running on http://localhost:3000/hello if you open in teh browser
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.json({ message: "User received", user }); // it shows error since its post
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
