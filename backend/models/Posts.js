import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true }, // Use ObjectId
    username: { type: String }, // Store user's name
    userProfession: { type: String , default:" "}, // Store user's profession
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
