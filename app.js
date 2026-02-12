import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import artifactRoutes from "./routes/artifact.routes.js"
import likeRoutes from "./routes/likes.routes.js"
import commentRoutes from "./routes/comment.routes.js"
import cookieParser from "cookie-parser";
import { testingCron } from "./cron/testing.js";


const app = express();
testingCron();

// Middleware
app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "CMS is Running."
    });
})

app.use("/auth",authRoutes);
app.use("/artifact",artifactRoutes);
app.use("/likes",likeRoutes);
app.use("/comments",commentRoutes);
app.use("/webhooks", await import("./webhooks/webhook.js").then(module => module.default));

export default app;