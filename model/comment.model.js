const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
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

const CommentSchema = new mongoose.Schema(
    {
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      content: {
        type: String,
        trim: true,
        required: true,
      },
      replies: [replySchema],
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
  
const Comment = mongoose.model("Comment", CommentSchema);
const Reply = mongoose.model("Reply", replySchema);
module.exports ={
    Comment,
    Reply,
}
