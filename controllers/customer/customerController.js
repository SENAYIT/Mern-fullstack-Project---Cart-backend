// ✅ User Controller (controllers/userController.js)
const Customer = require("../../models/Customer");
const bcrypt = require("bcryptjs");

// note : for getAllUsers and getUser
// if its ok -> return ( data (user for getUser) , success and message ) from backend
// if its error -> return (success: false and error ) from backend

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}, "-password").sort({
      createdAt: -1,
    }); // hide password

    if (!customers.length)
      return res.status(404).json({
        success: false,
        message: "No customers found in the database",
      });
    // res.json(users);
    res.json({
      success: true,
      data: customers,
      message: "All customers fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id, "-password");
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    // res.json(user);
    return res.json({
      customer,
      success: true,
      message: "Customer data fetched from the database",
    });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
// note : for update and delete
// if its ok -> return (success and message ) from backend
// if its error -> return (success: false and error ) from backend

exports.updateCustomer = async (req, res) => {
  try {
    const { name, profile_photo, email, phoneNumber, password } = req.body;

    // Build update object only with provided fields
    const updates = {};
    if (name) updates.name = name;
    if (profile_photo) updates.profile_photo = profile_photo;
    if (email) updates.email = email;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    // if (date) updates.date = date;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedCustomer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });

    res.json({
      success: true,
      customer: updatedCustomer,
      message: "Customer updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    // res.json({ message: "Customer deleted" });
    res.json({ success: true, message: "Customer deleted from the database" });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
