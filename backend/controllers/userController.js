import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });

// Middleware to verify JWT
const verifyToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided, authorization denied");
  return jwt.verify(token, JWT_SECRET);
};

// Get user profile
export const userProfile = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const userId = decoded.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      title: user.title || "",
      location: user.location || "",
      about: user.about || "",
      skills: user.skills || [],
      profilePicture: user.profilePicture
        ? `${req.protocol}://${req.get("host")}${user.profilePicture}`
        : "",
    });
  } catch (error) {
    res.status(401).json({ message: error.message || "Invalid token" });
  }
};

// Update user profile
export const userProfileUpdate = async (req, res) => {
  try {
    const decoded = verifyToken(req);
    const userId = decoded.id;

    const { name, title, location, about, skills } = req.body;
    let profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Ensure skills is stored as an array
    const formattedSkills = skills
      ? Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => skill.trim())
      : [];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        title,
        location,
        about,
        skills: formattedSkills,
        ...(profilePicture && { profilePicture }),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      profilePicture: updatedUser.profilePicture
        ? `${req.protocol}://${req.get("host")}${updatedUser.profilePicture}`
        : "",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
