const Customer = require("../../models/Customer");

exports.getFilteredCustomers = async (req, res) => {
  try {
    const { query = "", ITEMS_PER_PAGE, currentPage } = req.params;

    const limit = Number(ITEMS_PER_PAGE);
    const page = Number(currentPage);
    const offset = (page - 1) * limit;

    const filter = query
      ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phoneNumber: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const totalCustomers = await Customer.countDocuments(filter);

    const customers = await Customer.find(filter).skip(offset).limit(limit);

    res.json({
      success: true,
      totalCustomers,
      data: customers,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
