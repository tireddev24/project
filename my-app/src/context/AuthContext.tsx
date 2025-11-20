import React, {createContext, useState} from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	accessToken: string | null;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	accessToken: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem("accessToken"),
	);

	const login = (token: string) => {
		setAccessToken(token);
		localStorage.setItem("accessToken", token);
	};

	const logout = () => {
		setAccessToken(null);
		localStorage.removeItem("accessToken");
	};

	const isAuthenticated = Boolean(accessToken);

	return (
		<AuthContext.Provider
			value={{isAuthenticated, accessToken, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};
