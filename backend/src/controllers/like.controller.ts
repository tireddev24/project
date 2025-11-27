import {Request, Response} from "express";
import prisma from "../config/db";
import {sendNotification} from "../utils/sendNotification";

// LIKE A POST
export const likePost = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;
		const userId = req.user!.userId;

		// Check if like already exists
		const existingLike = await prisma.like.findFirst({
			where: {postId, userId},
		});

		if (existingLike) {
			return res
				.status(400)
				.json({message: "You already liked this post"});
		}

		// Create new like
		const like = await prisma.like.create({
			data: {
				postId,
				userId,
			},
		});

		const post = await prisma.post.findFirst({
			where: {id: postId},
			include: {
				user: true,
			},
		});

		if (post && like.userId !== post.user.id) {
			await sendNotification({
				userId: post.user.id,
				type: "LIKE",
				message: "Someone liked your post",
				postId,
			});
		}

		return res.status(201).json({message: "Post liked", like});
	} catch (error) {
		console.error("Like error:", error);
		res.status(500).json({error: "Unable to like post"});
	}
};

// UNLIKE A POST
export const unlikePost = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;
		const userId = req.user?.userId;

		const isPostExist = await prisma.post.findFirst({
			where: {id: postId},
		});

		if (!isPostExist) {
			return res.status(404).json({message: "Post not found"});
		}

		const existingLike = await prisma.like.findFirst({
			where: {postId, userId},
		});

		if (!existingLike) {
			return res
				.status(400)
				.json({message: "You have not liked this post"});
		}

		await prisma.like.delete({
			where: {id: existingLike.id},
		});

		return res.status(200).json({message: "Post unliked"});
	} catch (error) {
		console.error("Unlike error:", error);
		res.status(500).json({error: "Unable to unlike post"});
	}
};

// GET ALL LIKES FOR A POST
export const getPostLikes = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;

		const isPostExist = await prisma.post.findFirst({
			where: {id: postId},
		});

		if (!isPostExist) {
			return res.status(404).json({message: "Post not found"});
		}
		const likes = await prisma.like.findMany({
			where: {postId},
			include: {
				user: true,
			},
		});

		return res.status(200).json({likes, likesCount: likes.length});
	} catch (error) {
		console.error("Fetch likes error:", error);
		res.status(500).json({error: "Unable to fetch likes"});
	}
};

// CHECK IF USER LIKED A POST (useful for frontend)
export const checkIfUserLiked = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;
		const userId = req.user?.userId;

		const isPostExist = await prisma.post.findFirst({
			where: {id: postId},
		});

		if (!isPostExist) {
			return res.status(401).json({message: "Post not found"});
		}

		const like = await prisma.like.findFirst({
			where: {postId, userId},
		});

		return res.status(200).json({liked: like});
	} catch (error) {
		console.error("Check like error:", error);
		res.status(500).json({error: "Unable to check like status"});
	}
};

export const getAllLikes = async (req: Request, res: Response) => {
	try {
		const likes = await prisma.like.findMany({
			include: {
				user: true,
			},
		});

		return res.status(200).json({likes, likesCount: likes.length});
	} catch (error) {
		console.error("Fetch likes error:", error);
		res.status(500).json({error: "Unable to fetch likes"});
	}
};
