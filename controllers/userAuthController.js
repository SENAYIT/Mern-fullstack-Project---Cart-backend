const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register - create user
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 500).json({
      success: false,
      message: err.code === 11000 ? "Email already registered" : err.message,
    });
  }
};

/// for login function
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  // const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const user = await User.findOne({ email });

    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (!user || !isMatch)
      return res
        .status(400)
        .json({ message: "Invalid email or password from backend" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // res.json({ token });
    // res.json({ id: user._id, name: user.name, email: user.email });

    return res.status(200).json({
      user,
      role: "user",
      success: true,
      message: "User login successfully at the data base",
      token,
    });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
