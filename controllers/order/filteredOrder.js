const Order = require("../../models/order");

// either status or date
exports.getFilteredOrders_StatusOrDate = async (req, res) => {
  try {
    const { status, startDate, endDate, ITEMS_PER_PAGE, currentPage } =
      req.params;

    const limit = Number(ITEMS_PER_PAGE);
    const page = Number(currentPage);
    const offset = (page - 1) * limit;

    const filter = {
      $or: [],
    };

    // Filter by status
    if (status) {
      filter.$or.push({
        status: {
          $regex: status,
          $options: "i",
        },
      });
    }

    // Filter by date
    if (startDate && endDate) {
      filter.$or.push({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
    }

    // If no filter is selected, get all orders
    if (filter.$or.length === 0) {
      delete filter.$or;
    }

    const totalOrders = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalOrders,
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// both status and date
exports.getFilteredOrders_bothStatusAndDate = async (req, res) => {
  try {
    const { status, startDate, endDate, ITEMS_PER_PAGE, currentPage } =
      req.params;

    const limit = Number(ITEMS_PER_PAGE);
    const page = Number(currentPage);

    const offset = (page - 1) * limit;

    // Build filter dynamically
    const filter = {};

    // Filter by status
    if (status) {
      filter.status = {
        $regex: status,
        $options: "i",
      };
    }

    // Filter by date range
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const totalOrders = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      data: orders,
      message: "Filtered orders fetched successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
