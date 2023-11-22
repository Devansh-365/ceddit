const express=require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const comment = require("../controller/comment.controller");

router.post('/:postId',verifyToken,comment.writeCommentForPost)
router.post('/:postId/reply/:id',verifyToken,comment.addReply)
// router.get('/:id',comment.getCommentWithReplies)

module.exports = router;