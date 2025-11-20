import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api", // Update if backend URL changes
});

// REGISTER
export const registerUser = async (data: {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
}) => {
	return await API.post("/auth/register", data);
};

// LOGIN
export const loginUser = async (data: {email: string; password: string}) => {
	return await API.post("/auth/login", data);
};
