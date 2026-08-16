const Customer = require("../../models/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register - create customer
exports.customerRegister = async (req, res) => {
  try {
    const { name, profile_photo, email, phoneNumber, password } = req.body;
    const existing = await Customer.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Customer already exists" });
    }

    const customer = await Customer.create({
      name,
      profile_photo,
      email,
      phoneNumber,
      password,
      // date,
    });

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer,
    });
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 500).json({
      success: false,
      message: err.code === 11000 ? "Email already registered" : err.message,
    });
  }
};

/// for login function
exports.customerLogin = async (req, res) => {
  const { email, password } = req.body;
  // const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const customer = await Customer.findOne({ email });

    const isMatch =
      customer && (await bcrypt.compare(password, customer.password));
    if (!customer || !isMatch)
      return res
        .status(400)
        .json({ message: "Invalid email or password from backend" });

    // Create JWT
    const token = jwt.sign(
      { id: customer._id, email: customer.email, role: "customer" },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // res.json({ token });
    // res.json({ id: user._id, name: user.name, email: user.email });

    return res.status(200).json({
      customer,
      role: "customer",
      success: true,
      message: "Customer login successfully at the data base",
      token,
    });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
