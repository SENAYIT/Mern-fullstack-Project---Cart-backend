const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: 300,
    },

    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Category is required"],
    // },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: 0,
      default: 0,
    },
    // totalSold: {
    //   type: Number,
    //   required: [false],
    //   min: 0,
    //   default: 0,
    // },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "new", "low-stock"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

// // sample data
// {
//   "_id": "66c123456789",
//   "name": "Wireless Mouse",
//   "description": "Comfortable wireless mouse with ergonomic design.",
//   "category": "66b123456789",
//   "price": 29.99,
//   "stock": 50,
//   "image": "/uploads/products/mouse.jpg",
//   "status": "active",
//   "createdAt": "2026-07-31T10:00:00.000Z",
//   "updatedAt": "2026-07-31T10:00:00.000Z"
// }
