import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./routes/root.routes";

dotenv.config();
const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
	res.send("Welcome to MoodBoard Backend!");
});

export default app;
