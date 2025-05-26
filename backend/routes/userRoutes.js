import express from "express";
import { userProfile, userProfileUpdate, upload } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", userProfile);
userRoutes.patch("/", upload.single("profilePicture"), userProfileUpdate);

export default userRoutes;
