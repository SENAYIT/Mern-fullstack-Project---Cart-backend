// ✅ User Controller (controllers/userController.js)
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// note : for getAllUsers and getUser
// if its ok -> return ( data (user for getUser) , success and message ) from backend
// if its error -> return (success: false and error ) from backend

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // hide password

    if (!users.length)
      return res.status(404).json({
        success: false,
        message: "No users found in the database",
      });
    // res.json(users);
    res.json({
      success: true,
      data: users,
      message: "All users fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    // res.json(user);
    return res.json({
      user,
      success: true,
      message: "User data fetched from the database",
    });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
// note : for update and delete
// if its ok -> return (success and message ) from backend
// if its error -> return (success: false and error ) from backend

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 👀 Build update object only with provided fields
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: updatedUser,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // res.json({ message: "User deleted" });
    res.json({ success: true, message: "User deleted from the database" });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};

//not fine for real project
// exports.updateUser = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, req.body);
//     // res.json({ message: "User updated" });
//     res.json({ success: true, message: "User updated from the database" });
//   } catch (err) {
//     // res.status(400).json({ error: "Registration failed" });
//     res.status(400).json({ success: false, error: err.message });
//   }
// };
