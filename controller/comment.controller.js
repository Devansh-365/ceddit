const { Comment, Reply } = require("../model/comment.model");
const Post = require("../model/post.model");

const writeComment = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post.comments) {
      post.comments = [];
    }

    const newComment = new Comment({
      commentedBy: req.user.userId,
      content: comment,
    });
    await newComment.save();

    post.comments.push(newComment);
    post.commentCount += 1;

    await post.save();

    res.json({
      message: "Comment added successfully",
      commentId: newComment._id,
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
const addReply = async (req, res) => {
  const commentId = req.params.id;
  const { reply } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const newReply = new Reply({
      repliedBy: req.user.userId,
      content: reply,
    });
    await newReply.save();
    const repliesLengthBefore = comment.replies.length;

    comment.replies.push(newReply);

    await comment.save();

    const repliesLengthAfter = comment.replies.length;

    const replyAdded = repliesLengthAfter > repliesLengthBefore;

    res.json({
      message: "Reply added successfully",
      reply: newReply,
      replyAdded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const getCommentWithReplies = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId).populate("replies");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment retrieved successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  writeComment,
  addReply,
  getCommentWithReplies,
};
