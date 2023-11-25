const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const comment = require("../controller/comment.controller");

router.post("/:postId", verifyToken, comment.createComment);
router.get("/post/:id", comment.getPostComments);
router.post("/:commentId/upvote", verifyToken, comment.upvoteComment);
router.post("/:commentId/downvote", verifyToken, comment.downvoteComment);
router.post("/:postId/reply/:id", verifyToken, comment.addReply);
router.put("/:id", verifyToken, comment.updateCommentForPost);
router.delete("/:postId/:id", verifyToken, comment.deleteCommentForPost);

module.exports = router;
