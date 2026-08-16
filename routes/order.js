const express = require("express");
const {
  createOrder,
  getAllCustomersOrders,
  getCustomer_AllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllCustomersOrders);
router.get("/:customerId/all_orders", getCustomer_AllOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
