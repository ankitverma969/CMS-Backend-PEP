import express from "express";
import {
    createArtifact,
    getArtifacts
} from "../controllers/artifact.controller.js"
import { authMiddleware} from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { upload } from "../middleware/uploads.middleware.js";
import apiLimiter from "../middleware/rate.limit.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware,createArtifact);
router.post("/createWithFile",authMiddleware,upload.single("file"), createArtifact);
router.get("/", authMiddleware, apiLimiter, getArtifacts);
router.get("/", authMiddleware,authorizeRoles("ADMIN"), getArtifacts);


export default router;