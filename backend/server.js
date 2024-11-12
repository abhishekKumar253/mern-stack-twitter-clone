import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { config } from "./db/config.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(config.port || 8000, () => {
      console.log(`⚙️ Server is running on port ${config.port || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error);
  });
