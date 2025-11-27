import {useAuth} from "@/context/AuthContext";
import axios from "axios";

import {SERVER_URI} from "@/utils/secrets";

export const API = axios.create({
	baseURL: `${SERVER_URI}/api`,
	withCredentials: true, // Update if backend URL changes
});

const api = axios.create({
	baseURL: `${SERVER_URI}/api`,
	withCredentials: true, // Update if backend URL changes
});

API.interceptors.request.use((config) => {
	const {accessToken} = useAuth();
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

// Auto refresh when access token expires
API.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalReq = error.config;

		// Only refresh once
		if (error.response?.status === 401 && !originalReq._retry) {
			originalReq._retry = true;
			try {
				const refreshRes = await axios.post(
					`${SERVER_URI}/api/auth/refresh-token`,
					{},
					{withCredentials: true},
				);

				const {accessToken} = refreshRes.data;
				const {setAccessToken} = useAuth();

				setAccessToken(accessToken);

				originalReq.headers.Authorization = `Bearer ${accessToken}`;

				return API(originalReq); // retry original request
			} catch (refreshError) {
				const {logout} = useAuth();
				logout();
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

// REGISTER
export const registerUser = async (data: {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
}) => {
	return await api.post("/auth/register", data);
};

// LOGIN
export const loginUser = async (data: {email: string; password: string}) => {
	return await api.post("/auth/login", data);
};

export const refreshToken = async (data: {refreshToken: string}) => {
	return await api.post("/auth/refresh-token", data);
};

export const createPost = async (formData: {formData: any}) => {
	return await API.post("/posts", formData, {
		headers: {"Content-Type": "application/json"},
	});
};
