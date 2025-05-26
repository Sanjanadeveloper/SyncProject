import Post from "../models/Posts.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const updatePost = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Extract post ID from request params
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this post" });
    }

    // Delete the post
    await Post.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "Post update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error update post", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Extract post ID from request params
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const nameProUser = await User.findById(userId);
    const username = nameProUser.name;
    const userProfession = nameProUser.title;

    const newPost = new Post({
      userId,
      title,
      content,
      username,
      userProfession,
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts of the current logged-in user
export const getUserPosts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const userPosts = await Post.find({ userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user posts", error: error.message });
  }
};

// Get all posts from the database
export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all posts", error: error.message });
  }
};
