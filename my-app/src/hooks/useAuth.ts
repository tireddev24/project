// import {AuthContext} from "@/context/AuthContext";
import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {loginUser, registerUser} from "../api/auth";

export const useAuthHandler = () => {
	const [loading, setLoading] = useState(false);

	const {setAccessToken, setUser} = useAuth();

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
				message: err.response?.data?.message || "Error creating user",
			};
		}
	};

	const handleLogin = async (data: any) => {
		setLoading(true);
		console.log("logged");

		try {
			const res = await loginUser({
				email: data.email,
				password: data.password,
			});

			setAccessToken(res.data.accessToken);
			setUser(res.data.user);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			localStorage.setItem(
				"accessToken",
				JSON.stringify(res.data.accessToken),
			);
			localStorage.setItem(
				"refreshToken",
				JSON.stringify(res.data.refreshToken),
			);

			return {success: true, data: res.data};
		} catch (err: any) {
			return {
				success: false,
				message: err.response?.data?.message || "Error  posting",
			};
		} finally {
			setLoading(false);
		}
	};

	return {loading, register, handleLogin};
};
