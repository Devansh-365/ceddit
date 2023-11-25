const Comment = require("../model/comment.model");
const Post = require("../model/post.model");

const createComment = async (req, res) => {
  try {
    const { content, parentId } = req.body;
    const postId = req.params.postId;
    const userId = req.user.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.comments) {
      post.comments = [];
    }
    const comment = await Comment.create({
      content,
      parent: parentId,
      post: postId,
      commentedBy: userId,
    });

    await comment.save();
    post.commentCount += 1;
    await post.save();

    await Comment.populate(comment, {
      path: "commentedBy",
      select: "-password",
    });
    res
      .status(200)
      .json({ message: "Comment added successfully", comment: comment });
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
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).populate('commentedBy');

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

  

    if (!comment.commentedBy || comment.commentedBy._id.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Access is denied." });
    }

    comment.content = content;
    comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const deleteCommentForPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const isAdmin = req.user.isAdmin;
    const postId = req.params.postId;
    const commentId = req.params.id;

    const post = await Post.findById(postId);
    console.log(isAdmin)

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = await Comment.findById(commentId).populate('commentedBy');
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.commentedBy._id.toString() === userId || isAdmin ) {
      await Comment.deleteOne({ _id: commentId });
    }
    else{
      return res.status(401).json({ message: "Access is denied." });
    }
    await Comment.deleteOne({ _id: commentId });
    post.commentCount -= 1;

    await post.save();

    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const upvoteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.userId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasUpvoted = comment.upvotedBy.includes(userId);
    const hasDownvoted = comment.downvotedBy.includes(userId);

    if (hasDownvoted) {
      comment.downvotedBy = comment.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
    }

    if (hasUpvoted) {
      comment.upvotedBy = comment.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
      await comment.save();
      return res
        .status(200)
        .json({ message: "Successfully removed upvote from the comment" });
    }

    comment.upvotedBy.push(userId);
    await comment.save();

    return res
      .status(200)
      .json({ message: "Successfully upvoted the comment" });
  } catch (error) {
    console.error(`Error upvoting comment: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const downvoteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.userId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "comment not found" });
    }

    const hasUpvoted = comment.upvotedBy.includes(userId);
    const hasDownvoted = comment.downvotedBy.includes(userId);

    if (hasUpvoted) {
      comment.upvotedBy = comment.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
    }

    if (hasDownvoted) {
      comment.downvotedBy = comment.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      comment.downvotedBy.push(userId);
    }

    await comment.save();

    return res
      .status(200)
      .json({ message: "Successfully downvoted the comment" });
  } catch (error) {
    console.error(`Error downvoting comment: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createComment,
  getPostComments,
  addReply,
  updateCommentForPost,
  deleteCommentForPost,
  upvoteComment,
  downvoteComment,
};
