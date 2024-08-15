import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { config } from "./db/config.js";
import { app } from "./app.js";
import path from "path";
import express from "express";

dotenv.config();

const __dirname = path.resolve();

if (config.node_env === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

connectDB()
  .then(() => {
    app.listen(config.port || 5000, () => {
      console.log(`⚙️ Server is running on port ${config.port || 5000}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });
