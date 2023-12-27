const express = require("express");
const router = express.Router();
const posts = require("../controller/post.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, posts.createPost);
router.get("/", posts.getPosts);
router.get("/:id", posts.getPostById);

router.get("/search/searched", posts.searchPosts);

router.get("/page/:pageNumber", posts.getSecPosts);

router.delete("/:id", verifyToken, posts.deletePost);
router.put("/:id", verifyToken, posts.updatePost);
router.post("/:postId/upvote", verifyToken, posts.upvotePost);
router.post("/:postId/downvote", verifyToken, posts.downvotePost);

module.exports = router;
