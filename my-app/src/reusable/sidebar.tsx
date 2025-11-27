import {
	Bell,
	ChatBubble,
	IDashboard,
	Plus,
	Search,
	User,
} from "@/components/ui/icons";
import {HStack} from "@chakra-ui/react";
import {NavLink, useLocation} from "react-router-dom";

import {useAuth} from "@/context/AuthContext";
import {IoLogOut} from "react-icons/io5";
import {toaster} from "../components/ui/toaster";

const Sidebar = () => {
	const location = useLocation();
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

	return (
		<>
			{links.map((link, index) => (
				<NavLink key={index} to={`../${link.link}`} className={"block"}>
					<HStack
						textTransform={"capitalize"}
						rounded={"md"}
						shadow={"sm"}
						fontSize={24}
						justifyContent={"flex-start"}
						p={2}
						m={5}
						w={"150px"}
						// bg={"primary"}
						// bg={path.includes(link.link) ? "white" : "black"}
						borderRight={
							path.includes(link.link)
								? "2px solid #f7d4e1"
								: "none"
						}
						// color={path.includes(link.link) ? "black" : "white"}
						_hover={{
							borderRight: "2px solid#f7d4e1",
							color: "black",
						}}>
						<span>{link.icon}</span>
						<span>{link.title}</span>
					</HStack>
				</NavLink>
			))}
		</>
	);
};

export default Sidebar;
