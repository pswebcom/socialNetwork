const express = require("express");

const {
  getAllUsers,
  userById,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/users", getAllUsers);
//people can see all the lists but if they want to check single user they should be looged in
router.get("/user/:userId", requireSignIn, getSingleUser);
router.put("/user/:userId", requireSignIn, updateUser);
router.delete("/user/:userId", requireSignIn, deleteUser);
//any routes containing 'userId' our app will first execute userById()...
router.param("userId", userById);

module.exports = router;
