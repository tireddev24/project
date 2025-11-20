import bcrypt from "bcrypt";
import {Request, Response} from "express";
import prisma from "../config/db";
import {generateNew, generateTokens, verifyToken} from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
	const {username, email, password} = req.body;
	if (!username || !email || !password) {
		return res
			.status(400)
			.json({message: "Username, email, and password are required"});
	}

	try {
		const hashed = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {username, email, password: hashed},
		});

		const tokens = await generateTokens(user.id);
		res.status(201).json({user, ...tokens});
	} catch (error) {
		res.status(400).json({message: "Error registering user", error});
	}
};

export const login = async (req: Request, res: Response) => {
	const {email, password} = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({message: "email and password are required"});
	}

	try {
		const user = await prisma.user.findUnique({where: {email}});
		if (!user) return res.status(404).json({message: "User not found"});

		const valid = await bcrypt.compare(password, user.password);
		if (!valid)
			return res.status(401).json({message: "Invalid credentials"});

		const tokens = await generateTokens(user.id);
		res.json({user, ...tokens});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Error logging in", error});
	}
};

export const refreshAccessToken = async (req: Request, res: Response) => {
	const {refreshToken} = req.body;

	if (!refreshToken)
		return res.status(400).json({message: "No refresh token provided"});

	try {
		const stored = await prisma.refreshToken.findUnique({
			where: {token: refreshToken},
		});

		if (!stored || stored.expiresAt < new Date()) {
			return res
				.status(403)
				.json({message: "Invalid or expired refresh token"});
		}

		const payload = verifyToken(refreshToken);

		const newAccess = await generateNew(payload.userId);

		res.json({message: "Token generated", accessToken: newAccess});
	} catch (err) {
		res.status(403).json({message: "Could not refresh access token"});
	}
};

export const deleteUsers = async (req: Request, res: Response) => {
	const {userId} = req.params;
	try {
		// Delete related records first due to foreign key constraints
		await prisma.refreshToken.deleteMany({});

		const user = await prisma.user.deleteMany({});

		res.status(200).json({message: "User deleted successfully", user});
	} catch (error) {
		res.status(500).json({message: "Error deleting user", error});
	}
};
