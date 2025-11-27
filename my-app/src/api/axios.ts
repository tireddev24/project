import {SERVER_URI} from "@/utils/secrets";
import axios from "axios";
import {useAuth} from "../context/AuthContext";

const api = axios.create({
	baseURL: `${SERVER_URI}/api`,
	withCredentials: true, // enables refresh token cookie
});

// This attaches the access token to each request
api.interceptors.request.use((config) => {
	const {accessToken} = useAuth();
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

// Auto refresh when access token expires
api.interceptors.response.use(
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

				return api(originalReq); // retry original request
			} catch (refreshError) {
				const {logout} = useAuth();
				logout();
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default api;
