import express from "express";
import { followUnfollowUser, getSuggestedUsers, getUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";


const router = express.Router();


router.get("/profile/:username",protectRoute ,getUserProfile);
router.get("/suggested",protectRoute , getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

export default router;