const express = require("express");
const router = express.Router();
const posts = require("../controller/post.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, posts.createPost);
router.get("/",  posts.getPosts)
router.get("/search", posts.searchPosts)
router.get("/:id",posts.getPostById)
router.delete("/:id",verifyToken,posts.deletePost);
router.put("/:id",verifyToken,posts.updatePost);


module.exports = router;
