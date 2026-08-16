const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product/productController");

const router = express.Router();

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
