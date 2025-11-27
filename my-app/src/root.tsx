import Sidebar from "@/reusable/sidebar";
import {Flex, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import {Outlet} from "react-router-dom";
import Landing from "./pages/landing";

const Root = () => {
	const [load, setLoad] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoad(false);
		}, 1500);
	});

	if (load) {
		return (
			<div className="flex min-h-screen items-center justify-center overflow-hidden ">
				<Landing />;
			</div>
		);
	}

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
				<VStack className="w-[700px]" overflowX={"hidden"}>
					<Outlet />
				</VStack>
			</Flex>
		</div>
	);
};

export default Root;
