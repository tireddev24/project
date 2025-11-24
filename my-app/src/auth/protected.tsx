import {Center, Spinner} from "@chakra-ui/react";
import {type JSX} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
	const {accessToken, loading} = useAuth();

	console.log(loading);

	// Wait while checking session
	if (loading) {
		return (
			<Center h="100vh">
				<Spinner size="lg" />
			</Center>
		);
	}

	// User not authenticated
	if (!accessToken) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
