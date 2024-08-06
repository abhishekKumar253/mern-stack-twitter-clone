import jwt from "jsonwebtoken";
import { config } from "../db/config.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: config.node_env !== "production",
  });
};
