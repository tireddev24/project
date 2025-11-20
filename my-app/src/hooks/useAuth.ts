import {AuthContext} from "@/context/AuthContext";
import {useContext, useState} from "react";
import {loginUser, registerUser} from "../api/auth";

export const useAuth = () => {
	const [loading, setLoading] = useState(false);

	const register = async (data: any) => {
		setLoading(true);
		try {
			const res = await registerUser(data);
			setLoading(false);
			return {success: true, data: res.data};
		} catch (err: any) {
			setLoading(false);
			return {
				success: false,
				message: err.response?.data?.message || "Error",
			};
		}
	};

	const {login: saveToken} = useContext(AuthContext);
	// const [loading, setLoading] = useState(false);

	const login = async (data: any) => {
		setLoading(true);
		try {
			const res = await loginUser(data);

			// Save token in global state
			saveToken(res.data.accessToken);

			setLoading(false);
			return {success: true, data: res.data};
		} catch (err: any) {
			setLoading(false);
			return {
				success: false,
				message: err.response?.data?.message || "Error",
			};
		}
	};

	return {loading, register, login};
};
