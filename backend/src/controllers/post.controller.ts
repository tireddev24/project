import {Request, Response} from "express";
import prisma from "../config/db";

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
	try {
		const {caption, quote, imageUrl, moodCategory, tags} = req.body;

		if (!caption || !moodCategory || !tags) {
			return res
				.status(400)
				.json({message: "Some required fields are empty"});
		}

		const post = await prisma.post.create({
			data: {
				caption,
				quote,
				imageUrl,
				moodCategory,
				userId: req.user!.userId,
				tags: {
					create:
						tags?.map((tag: string) => ({
							tag: {
								connectOrCreate: {
									where: {name: tag.toLowerCase()},
									create: {name: tag.toLowerCase()},
								},
							},
						})) || [],
				},
			},
			include: {
				tags: true,
			},
		});

		res.status(201).json({message: "Post created successfully", post});
	} catch (error) {
		console.error("Create post error:", error);
		res.status(500).json({error: "Unable to create post"});
	}
};

// GET ALL POSTS
export const getAllPosts = async (_req: Request, res: Response) => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
				likes: true,
				tags: {include: {tag: true}},
			},
			orderBy: {createdAt: "desc"},
		});

		res.status(200).json(posts);
	} catch (error) {
		console.error("Fetch posts error:", error);
		res.status(500).json({error: "Unable to fetch posts"});
	}
};

// GET SINGLE POST
export const getPostById = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;

		const post = await prisma.post.findUnique({
			where: {id: postId},
			include: {
				user: true,
				comments: true,
				likes: true,
				tags: {include: {tag: true}},
			},
		});

		if (!post) return res.status(404).json({error: "Post not found"});

		res.status(200).json(post);
	} catch (error) {
		console.error("Fetch post error:", error);
		res.status(500).json({error: "Unable to fetch post"});
	}
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;

		await prisma.post.delete({
			where: {id: postId},
		});

		res.status(200).json({message: "Post deleted"});
	} catch (error) {
		console.error("Delete post error:", error);
		res.status(500).json({error: "Unable to delete post"});
	}
};
