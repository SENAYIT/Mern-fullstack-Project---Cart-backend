// ✅  Auth Routes (routes/auth.js)
const express = require("express");

const {
  customerLogin,
  customerRegister,
} = require("../controllers/customer/customerAuthController");

const router = express.Router();

router.post("/customerRegister", customerRegister);
router.post("/customerLogin", customerLogin);

module.exports = router;
