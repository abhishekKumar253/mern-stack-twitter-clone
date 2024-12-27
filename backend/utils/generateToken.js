import jwt from "jsonwebtoken";
import { config } from "../db/config.js";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
