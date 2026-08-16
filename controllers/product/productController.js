// ✅ User Controller (controllers/userController.js)
const Product = require("../../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, status } = req.body;
    const existing = await Product.findOne({ name });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Product already exists" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      status,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 500).json({
      success: false,
      message: err.code === 11000 ? "product already created" : err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    if (!products.length)
      return res.status(404).json({
        success: false,
        message: "No product found in the database",
      });
    // res.json(users);
    res.json({
      success: true,
      data: products,
      message: "All products fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    // res.json(user);
    return res.json({
      product,
      success: true,
      message: "Product data fetched from the database",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, status } = req.body;

    // 👀 Build update object only with provided fields
    const updates = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (price) updates.price = price;
    if (stock) updates.stock = stock;
    if (image) updates.image = image;
    if (status) updates.status = status;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      },
    ).select();

    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    // res.json({ message: "User deleted" });
    res.json({ success: true, message: "Product deleted from the database" });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
