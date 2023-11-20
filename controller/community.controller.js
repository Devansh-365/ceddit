const Community = require("../model/community.model");
const Post = require("../model/post.model");

const createCommunity = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const userId=req.user.userId;

    if (!name || !bio) {
      return res.status(400).json({ error: "Both name and bio are required" });
    }

    const existingCommunity = await Community.findOne({
      $or: [{ name }],
    });

    console.log("existingCommunity: ", existingCommunity);

    if (existingCommunity) {
      return res.status(400).json({ error: "Community name must be unique" });
    }

    const community = await Community.create({
      name,
      bio,
      admin: userId,
      subscribedBy: [userId],
    });

    res.json(community);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getCommunityPosts= async (req,res)=>{
  const communityId = req.params.id;

  try {
    // Find the community by ID and populate the 'posts' field
    const community = await Community.findById(communityId).populate('posts');

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Access the populated posts
    const posts = community.posts;

    return res.json({ posts });
  } catch (error) {
    console.error(`Error getting community posts: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllCommunities= async (req, res) => {
  try {
    // Find all communities
    const communities = await Community.find();

    return res.json({ communities });
  } catch (error) {
    console.error(`Error getting communities: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const subscribedToCommunity= async(req,res)=>{
  const userId = req.user.userId; // Assuming the user information is attached by the authenticateJWT middleware
  const communityId = req.params.id;

  try {
    // Check if the community exists
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Check if the user is already subscribed
    if (community.subscribedBy.includes(userId)) {
      return res.status(400).json({ error: 'User is already subscribed to this community' });
    }

    // Subscribe the user to the community
    community.subscribedBy.push(userId);
    community.subscriberCount += 1;

    // Save the updated community
    await community.save();

    return res.status(200).json({ message: 'Successfully subscribed to the community' });
  } catch (error) {
    console.error(`Error subscribing to community: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}
const getTop10 = async (req, res) => {
  try {
    // Find the top 10 communities by subscribers in descending order
    const topCommunities = await Community.find()
      .sort({ subscriberCount: -1 })
      .limit(10);

    return res.status(200).json({ communities: topCommunities });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteCommunity=async(req,res) => {
  const communityId = req.params.id;

  try {
    // Check if the community exists
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Check if the user making the request is the admin of the community
    const userId = req.user.userId; // Assuming user information is attached by the authenticateJWT middleware
    if (community.admin.toString() !== userId) {
      return res.status(403).json({ error: 'Permission denied - You are not the admin of this community' });
    }

    // Delete the community
    await Community.deleteOne({ _id: communityId });

    return res.status(200).json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error(`Error deleting community: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}
const updatedCommunity=async(req, res) => {
  const communityId = req.params.id;
  const { name, bio } = req.body;

  try {
    // Check if the community exists
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    // Check if the user making the request is the admin of the community
    const userId = req.user.userId; // Assuming user information is attached by the authenticateJWT middleware
    if (community.admin.toString() !== userId) {
      return res.status(403).json({ error: 'Permission denied - You are not the admin of this community' });
    }

    // Update the community
    community.name = name || community.name; // Update the name if provided
    community.bio = bio || community.bio; // Update the bio if provided

    await community.save();

    return res.status(200).json({ message: 'Community updated successfully', community });
  } catch (error) {
    console.error(`Error updating community: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
  createCommunity,
  getCommunityPosts,
  getAllCommunities,
  subscribedToCommunity,
  getTop10,
  deleteCommunity,
  updatedCommunity
};
