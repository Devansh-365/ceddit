const Comment = require("../model/comment.model");
const Post = require("../model/post.model");

const writeCommentForPost = async (req, res) => {
  try {
    // Extract necessary data from the request
    const { content } = req.body;
    const commentedBy = req.user.userId;
    const postId = req.params.postId;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.comments) {
      post.comments = [];
    }
    // Create a new comment
    const newComment = new Comment({
      commentedBy,
      content,
    });

    await newComment.save();

    post.comments.push(newComment);
    post.commentCount += 1;

    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("commentedBy", "-password")
      .sort("-createdAt");

    let commentParents = {};
    let rootComments = [];
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      commentParents[comment._id] = comment;
    }
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.parent) {
        let commentParent = commentParents[comment.parent];
        if (!commentParent) {
          commentParent = { _id: comment.parent, children: [] };
          commentParents[comment.parent] = commentParent;
        }
        commentParent.children = [...commentParent.children, comment];
      } else {
        rootComments = [...rootComments, comment];
      }
    }
    return res.status(200).json(rootComments);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: err.message });
  }
};

const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const commentedBy = req.user.userId;
    const postId = req.params.postId;
    const commentId = req.params.id;

    const comment = new Comment({
      commentedBy: commentedBy,
      content: content,
      parents: commentId,
    });

    await comment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push(comment);
    post.commentCount += 1;

    await post.save();

    res
      .status(201)
      .json({ message: "reply added successfully", comment: comment });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: " could not save comment", error: err.message });
  }
};
const updateCommentForPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    const postId = req.params.postId;
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).populate("commentedBy");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // if (comment.commentedBy.toString() !== userId && !req.user.isAdmin) {
    //   return res.status(401).json({ message: "Access is denied." });
    // }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteCommentForPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const isAdmin = req.user.isAdmin;
    const postId = req.params.postId;
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // if (comment.commentedBy != userId && !isAdmin) {
    //   throw new Error("Not authorized to delete comment");
    // }

    await Comment.deleteOne({ _id: commentId });

    const post = await Post.findById(comment.post);

    post.commentCount = (await Comment.find({ post: post._id })).length;

    await post.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  writeCommentForPost,
  getPostComments,
  addReply,
  updateCommentForPost,
  deleteCommentForPost,
};
