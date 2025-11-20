import Sidebar from "@/reusable/sidebar";
import {Flex, VStack} from "@chakra-ui/react";

import {Outlet} from "react-router-dom";

const Root = () => {
	return (
		<div className="flex min-h-screen items-center justify-center ">
			<Flex backgroundColor={"white"} padding={5} rounded={"lg"}>
				<VStack
					className="w-[407px]"
					borderRight={"4px solid #f7d4e1"}
					rounded={"md"}>
					<Sidebar />
				</VStack>
				<VStack className="w-[800px]">
					<Outlet />
				</VStack>
			</Flex>
		</div>
	);
};

export default Root;
