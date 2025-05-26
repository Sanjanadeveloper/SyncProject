import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String }, // User's job title or designation
  location: { type: String }, // User's location
  about: { type: String }, // Short bio or about section
  skills: { type: [String] }, // ✅ Store skills as an array
  profilePicture: { type: String }, // URL of the profile picture
});

export default mongoose.model("User", UserSchema);
