import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./db/config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});



app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


export { app };
