import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "./db/config.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"

const app = express()


app.use(
    cors({
        origin: config.cors,
        credentials: true
    })
)

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export {app};