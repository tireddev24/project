import {Box, Button, Heading, HStack, Input, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function VerifyCode() {
	const navigate = useNavigate();

	const handleVerify = () => {
		navigate("../reset");
	};

	return (
		<div className="bg-white ">
			<Box padding={10} textAlign={"center"}>
				<Heading
					margin={10}
					textTransform={"uppercase"}
					fontSize={30}
					fontWeight={"700"}>
					Enter verification Code
				</Heading>
				<form className="flex flex-col items-center gap-8 *:w-100">
					<Text color={"primary"}>
						Enter the code that has been sent to your mail
					</Text>
					<div>
						<HStack justify={"center"}>
							<Input
								placeholder=""
								h={16}
								w={16}
								maxLength={1}
								fontSize={50}
								fontWeight={"bold"}
								textAlign={"center"}
								borderColor={"black"}
							/>
							<Input
								placeholder=""
								h={16}
								w={16}
								maxLength={1}
								fontSize={50}
								fontWeight={"bold"}
								textAlign={"center"}
								borderColor={"black"}
							/>{" "}
							<Input
								placeholder=""
								h={16}
								w={16}
								maxLength={1}
								fontSize={50}
								fontWeight={"bold"}
								textAlign={"center"}
								borderColor={"black"}
							/>{" "}
							<Input
								placeholder=""
								h={16}
								w={16}
								maxLength={1}
								fontSize={50}
								fontWeight={"bold"}
								textAlign={"center"}
								borderColor={"black"}
							/>{" "}
							<Input
								placeholder=""
								h={16}
								w={16}
								maxLength={1}
								fontSize={50}
								fontWeight={"bold"}
								textAlign={"center"}
								borderColor={"black"}
							/>
						</HStack>
					</div>
					<Button
						colorPalette={"#ffe170"}
						bgColor={"f7d4e1"}
						rounded={"2xl"}
						padding={6}
						onClick={() => handleVerify()}
						// disabled={true}
					>
						Next
					</Button>
				</form>
			</Box>
		</div>
	);
}
