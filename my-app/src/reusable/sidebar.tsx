import {
	Bell,
	ChatBubble,
	IDashboard,
	Plus,
	Search,
	User,
} from "@/components/ui/icons";
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
// import Topbar from "./reusable/topbar";

// import useLogout from "@/hooks/useLogout";
import {useState} from "react";
import Loader from "../components/ui/load";
import {Toaster} from "../components/ui/toaster";

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	// const {logoutUser} = useLogout();
	const [load, setLoad] = useState<boolean>(false);
	const path = location.pathname;

	const links = [
		{link: "home", title: "Home", icon: <IDashboard />},
		{link: "chat", title: "Chat", icon: <ChatBubble />},
		{link: "activity", title: "Activity", icon: <Bell />},
		{link: "explore", title: "Explore", icon: <Search />},
		{link: "exit", title: "Profile", icon: <User />},
		{link: "create", title: "Create", icon: <Plus />},
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
		<div>
			<VStack
				bg={"white"}
				color={"black"}
				borderRight={"1px solid #f0b8d8"}
				p={10}
				fontSize={"22px"}
				// minH={"100%"}
			>
				<Heading textTransform={"uppercase"} color={"danger"}>
					LOGO
				</Heading>
				<Box mt={10}>
					{links.map((link, index) => (
						<NavLink
							key={index}
							to={`../${link.link}`}
							className={"block"}>
							<HStack
								textTransform={"capitalize"}
								// minW={"7rem"}
								rounded={"xl"}
								w={"full"}
								// justifyContent={"flex-start"}s
								p={2}
								mb={5}
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
			</VStack>
		</div>
	);
};

export default Sidebar;
