const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "post",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
    children: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

commentSchema.post("remove", async function (res, next) {
  const comments = await this.model("comment").find({ parent: this._id });

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    await comment.remove();
  }

  next();
});

commentSchema.pre("save", function (next) {
  next();
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
