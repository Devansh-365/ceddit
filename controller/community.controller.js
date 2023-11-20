const Community = require("../model/community.model");

const createCommunity = async (req, res) => {
  try {
    const { name, bio, userId } = req.body;

    if (!(name && bio)) {
      throw new Error("All input required");
    }

    const existingCommunity = await User.findOne({
      $or: [{ name }],
    });

    console.log("existingCommunity: ", existingCommunity);

    if (existingCommunity) {
      throw new Error("Community name must be unique");
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

module.exports = {
  createCommunity,
};
