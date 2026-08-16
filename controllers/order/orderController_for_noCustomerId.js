const Order = require("../../models/Order");

//// for sprecific customersID request

exports.createOrder = async (req, res) => {
  try {
    const { customer, cartItems, status } = req.body;
    const totalPrice = 0;
    const order = await Order.create({
      customer,
      cartItems,
      totalPrice,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 500).json({
      success: false,
      message: err.code === 11000 ? "Order already created" : err.message,
    });
  }
};

exports.getCustomer_AllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.params.customerId,
    }).populate("cartItems.productId");

    if (!orders.length)
      return res.status(404).json({
        success: false,
        message: "No Order found in the this customer database",
      });
    // res.json(users);
    res.json({
      success: true,
      data: orders,
      message: "All Orders fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// check it it has issues - get all customers orders
exports.getAllCustomersOrders = async (req, res) => {
  try {
    // const orders = await Order.find({});
    const orders = await Order.find()
      .populate("customer")
      .populate("cartItems.productId")
      .sort({ createdAt: -1 });

    if (!orders.length)
      return res.status(404).json({
        success: false,
        message: "No Order found in the database",
      });

    res.json({
      success: true,
      data: orders,
      message: "All Orders fetched successfully from the database",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// !check
exports.updateOrder = async (req, res) => {
  try {
    const { customer, cartItems, status } = req.body;
    const totalPrice = 0;
    // Build update object only with provided fields
    const updates = {};
    if (customer !== undefined) updates.customer = customer;
    if (cartItems !== undefined) updates.cartItems = cartItems;
    if (totalPrice !== undefined) updates.totalPrice = totalPrice;
    if (status !== undefined) updates.status = status;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("customer", "name email")
      .populate("cartItems.cartItem", "name price image");

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order: updatedOrder,
      message: "Order updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// for both case with out customer id
// ////
// // !check it
exports.getOrder = async (req, res) => {
  try {
    // const order = await Order.findById(req.params.id);
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("cartItems.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });
    // res.json(user);
    return res.json({
      order,
      success: true,
      message: "Order data fetched from the database",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// nice done
exports.deleteOrder = async (req, res) => {
  try {
    // res.json({ message: "User deleted" });
    await Order.findByIdAndDelete(req.params.id);

    //  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    // if (!deletedOrder) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Order not found",
    //   });
    // }

    res.json({ success: true, message: "Order deleted from the database" });
  } catch (err) {
    // res.status(400).json({ error: "Registration failed" });
    res.status(400).json({ success: false, error: err.message });
  }
};
