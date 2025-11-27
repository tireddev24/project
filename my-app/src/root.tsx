import Sidebar from "@/reusable/sidebar";
import {Flex, VStack} from "@chakra-ui/react";

import {Outlet} from "react-router-dom";

const Root = () => {
	return (
		<div className="flex min-h-screen items-center justify-center overflow-hidden ">
			<Flex
				backgroundColor={"white"}
				padding={5}
				rounded={"lg"}
				h={"700px"}>
				<VStack
					className="w-[300px]"
					borderRight={"4px solid #f7d4e1"}
					rounded={"md"}>
					<Sidebar />
				</VStack>
				<VStack className="w-[800px]" overflowY={"scroll"}>
					<Outlet />
				</VStack>
			</Flex>
		</div>
	);
};

export default Root;
