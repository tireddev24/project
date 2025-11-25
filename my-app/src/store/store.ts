import type {CreatePost} from "@/types/types";
import axios from "axios";
import {create} from "zustand";

const uri = "http://localhost:5000/api";

const token = localStorage.getItem("accessToken") || "";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: true, // enables refresh token cookie
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`, // <-- Custom Header
		Accept: "application/json",
	},
});

export interface Post {
	id: string;
	caption: string;
	imageUrl?: string;
	moodCategory: string;
	tags?: string[];
	createdAt: string;
	user: {
		id: string;
		username: string;
		avatar?: string;
	};
	likes: number;
	comments: number;
}

interface PostState {
	posts: Post[];
	loading: boolean;

	fetchPosts: () => Promise<{success: boolean}>;
	createPost: (
		data: CreatePost,
	) => Promise<{success: boolean; message: string}>;
	likePost: (postId: string) => Promise<void>;
	addComment: (postId: string, text: string) => Promise<void>;
	savePost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
	posts: [],
	loading: false,

	fetchPosts: async () => {
		set({loading: true});
		const res = await api.get("/posts");
		set({posts: res.data, loading: false});

		return {success: true, message: "Posts fetched successfully"};
	},

	createPost: async (formData) => {
		const token = JSON.parse(localStorage.getItem("accessToken") || "");

		console.log(token);

		const res = await fetch(`${uri}/posts`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (res.status == 401) {
			return {success: false, message: "Token expired"};
		}

		if (res.status == 400) {
			return {success: false, message: data.message};
		}

		set({posts: [data, ...get().posts]});

		return {success: true, message: data.message};
	},

	likePost: async (postId) => {
		const res = await api.post(`/posts/${postId}/like`);
		set({
			posts: get().posts.map((p) =>
				p.id === postId ? {...p, likes: res.data.likes} : p,
			),
		});
	},

	addComment: async (postId, text) => {
		const res = await api.post(`/posts/${postId}/comments`, {text});
		set({
			posts: get().posts.map((p) =>
				p.id === postId ? {...p, comments: p.comments + 1} : p,
			),
		});
	},

	savePost: async (postId) => {
		await api.post(`/posts/${postId}/save`);
	},
}));
