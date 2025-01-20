import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_URI,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  node_env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
