// for all adminPurposes
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // fixed typo


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// for note purpose
// userSchema.pre("save", async function (next) {
//   // Step 1: If the password hasn’t changed (like during profile update), skip hashing
//   if (!this.isModified("password")) return next();

//   // Step 2: Create a salt (adds randomness so even same passwords hash differently)
//   const salt = await bcrypt.genSalt(10);

//   // Step 3: Hash the password using bcrypt
//   this.password = await bcrypt.hash(this.password, salt);

//   // Step 4: Continue saving
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
