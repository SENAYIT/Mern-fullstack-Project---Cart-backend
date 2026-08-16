const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // fixed typo

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profile_photo: {
      type: String,
      required: false,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // date: {
    //   type: String,
    //   required: true,
    // },
    // now added
    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true },
);

// 🔒 Hash password before saving
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
