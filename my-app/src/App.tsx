import {Box, Container} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import Register from "./auth/create";
import ForgotPassword from "./auth/forgotpassword";
import Login from "./auth/login";
import Reset from "./auth/resetpassword";
import VerifyCode from "./auth/verify";
import ChatPage from "./pages/chatpage";
import Feed from "./pages/feed";
import Root from "./root";

import {Search} from "@/components/ui/icons";
import ProtectedRoute from "./auth/protected";
import ActivityPage from "./pages/activitypage";
import CreatePage from "./pages/createpage";
import ExplorePage from "./pages/explorepage";
import ProfilePage from "./pages/profilepage";
<Search />;

function App() {
	return (
		<>
			<Box className=" bg-dark ">
				<Container maxWidth="breakpoint-4xl">
					<Routes>
						{/* Public */}
						<Route path="login" element={<Login />}>
							<Route
								path="forgot-password"
								element={<ForgotPassword />}>
								<Route path="verify" element={<VerifyCode />} />
								<Route path="reset" element={<Reset />} />
							</Route>
						</Route>
						<Route path="register" element={<Register />} />

						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Root />
								</ProtectedRoute>
							}>
							<Route path="feed" element={<Feed />} />
							<Route path="chat" element={<ChatPage />} />
							<Route path="activity" element={<ActivityPage />} />
							<Route path="profile" element={<ProfilePage />} />
							<Route path="explore" element={<ExplorePage />} />
							<Route path="create" element={<CreatePage />} />
						</Route>
					</Routes>
				</Container>
			</Box>
		</>
	);
}

export default App;
