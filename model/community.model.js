const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Must be at least 4 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
    },
    bio: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    subscribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    subscriberCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("community", CommunitySchema);
