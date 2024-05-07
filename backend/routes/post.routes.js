import express from "express";
import { commentPost, createPost, deletePost, likeUnlikePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";




const router = express.Router();


router.post("/create",protectRoute ,createPost);
router.post("/comment/:id",protectRoute ,commentPost);
router.post("/like/:id",protectRoute ,likeUnlikePost);
router.delete("/:id", protectRoute, deletePost);


export default router;



