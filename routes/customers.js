// ✅ 7. User Routes (routes/users.js)
const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();
// the below is with out  the token access
router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
