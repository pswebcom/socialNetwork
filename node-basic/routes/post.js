const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost,
} = require("../controllers/post");

const { requireSignIn } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);

//to create a new post user must be signed in ie--requireSignIn
router.post(
  //so if we dont supply :userId here userById will not be invoked and  req.profile = user will not be assigned
  "/post/new/:userId",
  requireSignIn,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignIn, postsByUser);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);

//any routes containing ':userId' our app will first execute userById()...
router.param("userId", userById);

//any routes containing ':postId' our app will first execute postById()...
router.param("postId", postById);

module.exports = router;
