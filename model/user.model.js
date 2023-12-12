const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Must be at least 4 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      minLength: [8, "Must be at least 8 characters long"],
    },
    image: { type: String },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    subscribedSubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "community",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
