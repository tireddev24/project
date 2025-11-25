import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	userId: string;
	email: string;
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({error: "No token provided"});
	}

	const token = authHeader.split(" ")[1];
	console.log(token);

	try {
		jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
			if (err) {
				return res.status(401).json({message: "Token Expired"});
			}

			// Attach user info (from token) to req object
			req.user = decoded as JwtPayload;

			next();
		});
	} catch (error) {
		console.error("Token verification error:", error);
		return res.status(401).json({error: "Invalid or expired token"});
	}
};
