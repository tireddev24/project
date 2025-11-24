import {Email} from "@/components/ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	Input,
	Text,
} from "@chakra-ui/react";
import {Link, Outlet, useLocation} from "react-router-dom";

export default function ForgotPassword() {
	const location = useLocation();

	const path = location.pathname;

	if (path.includes("verify")) {
		return (
			<div className="bg-white  h-full items-center">
				<Outlet />;
			</div>
		);
	}

	if (path.includes("reset")) {
		return (
			<div className="bg-white  h-full items-center">
				<Outlet />;
			</div>
		);
	}

	return (
		<div className="bg-white  items-center">
			<Box padding={10} textAlign={"center"}>
				<Heading
					margin={10}
					textTransform={"uppercase"}
					fontSize={36}
					fontWeight={"700"}>
					Forgot Password
				</Heading>
				<form className="flex flex-col items-center gap-8 *:w-100">
					<Text color={"primary"}>
						A code would be sent to your email to help reset your
						password
					</Text>
					<div>
						<HStack>
							<Icon
								position={"absolute"}
								marginLeft={3}
								fontSize={"20px"}>
								<Email />
							</Icon>
							<Input
								placeholder="Email"
								paddingLeft={10}
								h={12}
								w={"full"}
							/>
						</HStack>
					</div>
					<Button
						colorPalette={"#ffe170"}
						bgColor={"f7d4e1"}
						rounded={"2xl"}
						padding={6}
						disabled={false}>
						<Link to={"verify"}>Reset Password</Link>
					</Button>

					<Text>
						<Link to={"../"}>
							<b>Back to login</b>
						</Link>
					</Text>
				</form>
			</Box>
		</div>
	);
}
