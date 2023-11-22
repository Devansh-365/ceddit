const  Comment  = require("../model/comment.model");
const Post = require("../model/post.model");


const writeCommentForPost = async (req, res) => {
  try {
    // Extract necessary data from the request
    const { content } = req.body;
    const commentedBy=req.user.userId
    const postId = req.params.postId;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (!post.comments) {
      post.comments = [];
    }
    // Create a new comment
    const newComment = new Comment({
      commentedBy,
      content,
    });

    // Save the new comment to the database
    await newComment.save();

    // Add the comment to the post
    post.comments.push(newComment);
    post.commentCount += 1;

    // Save the updated post
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const commentedBy=req.user.userId
    const postId = req.params.postId;
    const commentId=req.params.id;
    
    const comment = new Comment({
      commentedBy: commentedBy,
      content: content,
      parents:commentId
    });

    await comment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push(comment._id);

    await post.save();

    
    res.status(201).json({ message: 'reply added successfully', comment: comment });
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:" could not save comment", error: err.message });
  }
};
module.exports = {
  
  writeCommentForPost
,addReply};
