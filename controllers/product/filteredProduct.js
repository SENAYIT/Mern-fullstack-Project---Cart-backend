const Product = require("../../models/product");

exports.getFilteredProducts = async (req, res) => {
  try {
    const { query = "", ITEMS_PER_PAGE, currentPage } = req.params;

    const limit = Number(ITEMS_PER_PAGE);
    const page = Number(currentPage);

    const offset = (page - 1) * limit;

    // Search filter
    const filter = query
      ? {
          $or: [
            {
              name: {
                $regex: query,
                $options: "i",
              },
            },
            {
              description: {
                $regex: query,
                $options: "i",
              },
            },
            {
              status: {
                $regex: query,
                $options: "i",
              },
            },
            {
              price: Number(query) || 0,
            },
          ],
        }
      : {};

    // Count filtered products
    const totalProducts = await Product.countDocuments(filter);

    // Get paginated products
    const products = await Product.find(filter).skip(offset).limit(limit);

    return res.json({
      success: true,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      data: products,
      message: "Filtered product data fetched successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
