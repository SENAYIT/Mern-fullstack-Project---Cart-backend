// server.js
const mongoose = require("mongoose"); // for db
const express = require("express");
// const User = require("../models/Users"); // use the model
const User = require("./models/User");

const app = express();
const PORT = 3000;

// for mongo db data connection
const uri =
  "mongodb+srv://senaitaweke2019:4EyP42q8EgJQ50g7@cluster0.xzvav8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware to parse JSON
app.use(express.json());

// for access the mongo db database using creataed api

// POST - create user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - list users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/////
// Test route from previuos at the first  post testing practice
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
