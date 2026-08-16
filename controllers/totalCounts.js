const Customer = require("../models/Customer");

exports.totalCounts = async (req, res) => {
  const totalCustomers = await Customer.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  res.json({
    customers: totalCustomers,
    products: totalProducts,
    orders: totalOrders,
  });
};
