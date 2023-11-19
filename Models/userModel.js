const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String }, // You may want to customize this based on how you store images, e.g., URL, base64, or a reference to an image in another collection.
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
};
