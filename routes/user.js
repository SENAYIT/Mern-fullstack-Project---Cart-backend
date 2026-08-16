// ✅ 7. User Routes (routes/users.js)
const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// /// i have to use the middleware when  use in tokken////
// const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();
// the below is with out  the token access
router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

///// the below is using the token access///
// router.get("/all", verifyToken, getAllUsers);
// router.get("/:id", verifyToken, getUser);
// router.put("/:id", verifyToken, updateUser);
// router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
