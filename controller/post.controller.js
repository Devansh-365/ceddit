const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content, userId, communityId } = req.body;

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

module.exports = {
  createPost,
};
