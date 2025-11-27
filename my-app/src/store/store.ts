import type {CreatePost} from "@/types/types";
import {SERVER_URI} from "@/utils/secrets";
import axios from "axios";
import {create} from "zustand";

const uri = `${SERVER_URI}/api`;

const token = sessionStorage.getItem("accessToken") || "";

const api = axios.create({
	baseURL: `${SERVER_URI}/api`,
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
	likes: any;
	comments: number;
}

interface PostState {
	posts: Post[];
	loading: boolean;

	fetchPosts: () => Promise<{success: boolean}>;
	createPost: (
		data: CreatePost,
	) => Promise<{success: boolean; message: string}>;
	likePost: (postId: string) => Promise<{success: boolean; message: string}>;
	unlikePost: (
		postId: string,
	) => Promise<{success: boolean; message: string}>;
	addComment: (postId: string, text: string) => Promise<void>;
	savePost: (postId: string) => Promise<void>;
}

interface LikeState {
	likes: Post[];
	loading: boolean;

	fetchLikes: (
		postId: string,
	) => Promise<{success: boolean; likesCount: number}>;
	fetchAllLikes: () => Promise<{success: boolean; likesCount: number}>;
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
		const token = JSON.parse(sessionStorage.getItem("accessToken") || "");

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
		const token = JSON.parse(sessionStorage.getItem("accessToken") || "");

		// console.log(token);

		const res = await fetch(`${uri}/posts/${postId}/like`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		if (res.status == 401) {
			return {success: false, message: "Token expired"};
		}

		if (res.status == 400) {
			return {success: false, message: data.message};
		}

		console.log(data);

		set({
			posts: get().posts.map((p) =>
				p.id === postId ? {...p, likes: data.like} : p,
			),
		});

		return {success: true, message: data.message};
	},

	unlikePost: async (postId) => {
		const token = JSON.parse(sessionStorage.getItem("accessToken") || "");

		console.log(token);

		const res = await fetch(`${uri}/posts/${postId}/unlike`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		if (res.status == 401) {
			return {success: false, message: "Token expired"};
		}

		if (res.status == 400) {
			return {success: false, message: data.message};
		}

		console.log(data);

		set({
			posts: get().posts.filter((p) =>
				p.id === postId ? {...p, likes: data.like} : p,
			),
		});

		return {success: true, message: data.message};
	},

	addComment: async (postId, text) => {
		await api.post(`/posts/${postId}/comments`, {text});
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

export const useLikeStore = create<LikeState>((set) => ({
	likes: [],
	loading: false,

	fetchLikes: async (postId: string) => {
		set({loading: true});

		const res = await fetch(`${uri}/posts/${postId}/likes`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		set({likes: data.likes, loading: false});

		return {success: true, likesCount: data.likesCount};
	},

	fetchAllLikes: async () => {
		set({loading: true});

		const token = JSON.parse(sessionStorage.getItem("accessToken") || "");

		const res = await fetch(`${uri}/posts/likes/all`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		set({likes: data.likes, loading: false});

		return {success: true, likesCount: data.likesCount};
	},
}));
