const Catagory = require("../models/catagory");

exports.createCatagory = async (req, res) => {
  try {
    const { name, status } = req.body();
    const existing = Catagory.findOne({ name });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Catagory already exists" });
    }

    const catagory = await Catagory.create({
      name,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Catagory registered successfully",
      customer,
    });
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 500).json({
      success: false,
      message: err.code === 11000 ? "catagory already registered" : err.message,
    });
  }
};

exports.getAllCatagories = async (req, res) => {
  try {
    const catagories = await Catagory.find({});

    if (!catagories.length)
      return res.status(404).json({
        success: false,
        message: "No Catagory found in the database",
      });
    // res.json(users);
    res.json({
      success: true,
      data: catagories,
      message: "All Catagories fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getCatagory = async (req, res) => {
  try {
    const catagory = await Catagory.findById(req.params.id);
    if (!catagory)
      return res.status(404).json({ message: "Catagory not found" });
    // res.json(user);
    return res.json({
      catagory,
      success: true,
      message: "Catagory data fetched from the database",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateCatagory = async (req, res) => {
  try {
    const { name, status } = req.body;

    // 👀 Build update object only with provided fields
    const updates = {};
    if (name) updates.name = name;
    if (status) updates.status = status;

    const updatedCatagory = await Catagory.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      },
    ).select();

    if (!updatedCatagory)
      return res
        .status(404)
        .json({ success: false, message: "Catagory not found" });

    res.json({
      success: true,
      catagory: updatedCatagory,
      message: "Catagory updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteCatagory = async (req, res) => {
  try {
    await Catagory.findByIdAndDelete(req.params.id);
    // res.json({ message: "User deleted" });
    res.json({ success: true, message: "Catagory deleted from the database" });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
