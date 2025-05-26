import express from "express";
import { signup, login } from "../controllers/authController.js";

const authRoutes = express.Router();

// Signup Route
authRoutes.post("/signup", signup);

// Login Route
authRoutes.post("/login", login);

export default authRoutes;
