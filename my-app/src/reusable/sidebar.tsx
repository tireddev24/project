import {
	Bell,
	ChatBubble,
	IDashboard,
	Plus,
	Search,
	User,
} from "@/components/ui/icons";
import {Box, Heading, HStack} from "@chakra-ui/react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {IoLogOut} from "react-icons/io5";
import Loader from "../components/ui/load";
import {toaster, Toaster} from "../components/ui/toaster";

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [load, setLoad] = useState<boolean>(false);
	const path = location.pathname;

	const logout = useAuth();

	const handleLogout = () => {
		toaster.create({
			type: "info",
			description: "Logging out",
		});

		logout.logout();
	};

	const links = [
		{link: "feed", title: "Feed", icon: <IDashboard />},
		{link: "chat", title: "Chat", icon: <ChatBubble />},
		{link: "activity", title: "Activity", icon: <Bell />},
		{link: "explore", title: "Explore", icon: <Search />},
		{link: "profile", title: "Profile", icon: <User />},
		{link: "create", title: "Create", icon: <Plus />},
		{
			link: "/login",
			title: "Logout",
			icon: <IoLogOut />,
			action: handleLogout,
		},
	];

	if (load) {
		return (
			<>
				<Toaster />
				<Loader />;
			</>
		);
	}

	return (
		<Box fontSize={"28px"} p={10}>
			<Toaster />
			<Heading textTransform={"uppercase"} color={"danger"}>
				LOGO
			</Heading>
			{links.map((link, index) => (
				<NavLink key={index} to={`../${link.link}`} className={"block"}>
					<HStack
						textTransform={"capitalize"}
						rounded={"xl"}
						// justifyContent={"flex-start"}
						// p={2}
						m={12}
						ml={"-10"}
						bg={"primary"}

						// bg={path.includes(link.link) ? "white" : "black"}
						// color={path.includes(link.link) ? "black" : "white"}
						// _hover={{bg: "white", color: "black"}}
					>
						{link.icon}
						{link.title}
					</HStack>
				</NavLink>
			))}
		</Box>
	);
};

export default Sidebar;
