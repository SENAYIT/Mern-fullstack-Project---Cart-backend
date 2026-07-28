// ✅  Auth Routes (routes/auth.js)
const express = require("express");

const {
  userLogin,
  userRegister,
} = require("../controllers/userAuthController");

const router = express.Router();

router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);

module.exports = router;
