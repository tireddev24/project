import {Spinner, VStack} from "@chakra-ui/react";

const Spin = () => {
	return (
		<VStack>
			<Spinner
				color={"gray.600"}
				css={{"--spinner-track-color": "colors.gray.200"}}
			/>
		</VStack>
	);
};

export default Spin;
