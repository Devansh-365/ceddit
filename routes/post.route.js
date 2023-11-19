const express = require("express");
const router = express.Router();
const posts = require("../controller/post.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, posts.createPost);

module.exports = router;
