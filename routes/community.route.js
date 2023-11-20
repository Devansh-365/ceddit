const express = require("express");
const router = express.Router();
const posts = require("../controller/post.controller");
const community = require("../controller/community.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, community.createCommunity);
router.get("/", community.getAllCommunities);
router.get("/top/top10", community.getTop10);
router.get("/:id", community.getCommunityPosts);
router.post("/:id/subscribe", verifyToken, community.subscribedToCommunity);
router.delete("/:id", verifyToken, community.deleteCommunity);
router.put("/:id", verifyToken, community.updatedCommunity);

module.exports = router;
