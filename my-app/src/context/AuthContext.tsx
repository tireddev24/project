import {refreshToken} from "@/api/auth";
import {createContext, useContext, useEffect, useState} from "react";

interface AuthContextType {
	user: any;
	accessToken: string | null;
	loading: boolean;
	setAccessToken: (t: string | null) => void;
	setUser: (u: any) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const logout = () => {
		setAccessToken(null);
		setUser(null);
		localStorage.removeItem("user");
	};

	useEffect(() => {
		const init = async () => {
			try {
				console.log("app init");
				const res = await refreshToken();
				console.log(res);
				setAccessToken(res.data.accessToken);
			} catch {
				logout();
			}
			setLoading(false);
		};
		init();
	}, []);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) setUser(JSON.parse(savedUser));
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				accessToken,
				setAccessToken,
				setUser,
				logout,
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext)!;
