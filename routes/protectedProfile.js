// ✅ 7. User Routes (routes/users.js)
const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware_usingNextauth");

function protectedProfile(req, res) {
  res.json({
    message: `Welcome ${req.user.email} to the users profile page -> from protected route`,
    user: req.user,
  });
}

router.get("/profile", verifyToken, protectedProfile); //protected endpoint

module.exports = router;
