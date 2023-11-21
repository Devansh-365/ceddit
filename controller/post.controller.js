const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content, communityId } = req.body;
    const userId=req.user.userId;

    if (!(title && content)) {
      throw new Error("All input required");
    }

    const post = await Post.create({
      title,
      content,
      user: userId,
      community: communityId,
      upvotedBy: [userId],
    });

    res.json(post);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getPosts=async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find().populate('user').populate('community'); // Populate user and community references

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const getPostById=async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by ID and populate user and community references
    const post = await Post.findById(postId).populate('user').populate('community');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const deletePost=async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the current user is the owner of the post or an admin
    if (post.user.equals(req.user.userId) || isAdmin(req.user)) {
      // Delete the post
      await Post.deleteOne({ _id: postId });

      return res.json({ message: 'Post deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error',error:error.message });
  }
}
const updatePost=async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the current user is the owner of the post or an admin
    if (post.user.equals(req.user.userId) ) {
      // Update the post
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      // Save the updated post
      await post.save();

      return res.json({ message: 'Post updated successfully', post });
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const searchPosts=async (req, res) => {
  const query = req.query.q; // Get the search query from the request query parameters

  try {
    // Use a regular expression to perform a case-insensitive search on the title and content fields
    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(query, 'i') } },
        { content: { $regex: new RegExp(query, 'i') } },
      ],
    }).populate('user').populate('community'); // Populate user and community references

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  searchPosts
};
