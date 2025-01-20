import express from "express";

import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;
