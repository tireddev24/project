import {useContext, type JSX} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

interface Props {
	children: JSX.Element;
}

export default function ProtectedRoute({children}: Props) {
	const {isAuthenticated} = useContext(AuthContext);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
