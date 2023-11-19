const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

CommunitySchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "community",
  justOne: false,
  options: { sort: { createdAt: -1 } },
});

module.exports = mongoose.model("community", CommunitySchema);
