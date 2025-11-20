import {VStack} from "@chakra-ui/react";
import Spin from "./spinner";

const Loader = () => {
	return (
		<VStack
			className=""
			// position={"rea"}
			top={0}
			left={0}
			minH={"100vh"}
			minW={"full"}
			justifyContent={"center"}>
			<div className="">
				<Spin />
			</div>
		</VStack>
	);
};

export default Loader;
