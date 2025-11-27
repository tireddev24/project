import express from "express";
import {
	checkIfUserLiked,
	getAllLikes,
	getPostLikes,
	likePost,
	unlikePost,
} from "../controllers/like.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/:postId/like", authMiddleware, likePost);
router.delete("/:postId/unlike", authMiddleware, unlikePost);
router.get("/:postId/likes", getPostLikes);
router.get("/:postId/liked", authMiddleware, checkIfUserLiked);
router.get("/likes/all", authMiddleware, getAllLikes);

export default router;
