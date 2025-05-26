import express from "express";
import {
  createPost,
  getUserPosts,
  getAllPosts,
  deletePost,
  updatePost,
} from "../controllers/postsController.js";

const postsRoutes = express.Router();

// Route to create a new post
postsRoutes.post("/", createPost);

// Route to get all posts of the current user
postsRoutes.get("/current-user-posts", getUserPosts);

// Route to get all posts from the database
postsRoutes.get("/", getAllPosts);
postsRoutes.delete("/delete/:id", deletePost);
postsRoutes.patch("/update/:id", updatePost);
export default postsRoutes;
