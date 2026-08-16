const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);
const Catagory = mongoose.model("Category", categorySchema);

module.exports = Catagory;

// sample data
// {
//   "_id": "66b123456789",
//   "name": "Electronics",
//   "status": "active",
//   "createdAt": "2026-07-31T09:30:00.000Z",
//   "updatedAt": "2026-07-31T09:30:00.000Z"
// }
