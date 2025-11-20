import {Email, Google, IEyeClose, IEyeOpen} from "@/components/ui/icons";
import Loader from "@/components/ui/load";
import {toaster, Toaster} from "@/components/ui/toaster";
import {useAuth} from "@/hooks/useAuth";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	Input,
	Text,
} from "@chakra-ui/react";
import {useState} from "react";
import {IoLockClosedOutline} from "react-icons/io5";
import {LuUserRound} from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const {register} = useAuth();

	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		username: "",
	});

	const [error, setError] = useState("");

	const handleChange = (e: any) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError("");

		const {success, message} = await register(form);

		toaster.create({
			type: success ? "success" : "error",
			title: success ? "success" : "Error",

			description: success ? "Account successfully created" : message,
		});

		setLoading(false);

		if (success) {
			navigate("/feed");
		}
	};

	return (
		<div className="flex min-h-screen  justify-center items-center">
			<Toaster />
			<Flex className="*:min-h-[700px] *:min-w-[550px] ">
				<div className="bg-white ">
					<Box padding={10} textAlign={"center"}>
						<Heading
							margin={10}
							textTransform={"uppercase"}
							fontSize={36}
							fontWeight={"700"}>
							Create your account
						</Heading>
						<form className="flex flex-col items-center gap-8 *:w-100">
							<div className="flex  items-center justify-center gap-6">
								<HStack>
									<Icon
										position={"absolute"}
										marginLeft={3}
										fontSize={"20px"}>
										<LuUserRound />
									</Icon>
									<Input
										name="firstname"
										placeholder="First Name"
										paddingLeft={10}
										h={10}
										onChange={handleChange}
										// w={48}
									/>
								</HStack>

								<HStack>
									<Icon
										position={"absolute"}
										marginLeft={3}
										fontSize={"20px"}>
										<LuUserRound />
									</Icon>
									<Input
										name="lastname"
										placeholder="Last Name"
										paddingLeft={10}
										h={10}
										onChange={handleChange}
										// w={48}
									/>
								</HStack>
							</div>
							<div>
								<HStack>
									<Icon
										position={"absolute"}
										marginLeft={3}
										fontSize={"20px"}>
										<LuUserRound />
									</Icon>
									<Input
										name="username"
										placeholder="User Name"
										paddingLeft={10}
										h={10}
										onChange={handleChange}
										// w={48}
									/>
								</HStack>
							</div>
							<div>
								<HStack>
									<Icon
										position={"absolute"}
										marginLeft={3}
										fontSize={"20px"}>
										<Email />
									</Icon>
									<Input
										name="email"
										placeholder="Email"
										paddingLeft={10}
										h={10}
										w={"full"}
										onChange={handleChange}
									/>
								</HStack>
							</div>
							<div>
								<HStack position={"relative"}>
									<Icon
										position={"absolute"}
										marginLeft={3}
										fontSize={"20px"}>
										<IoLockClosedOutline />
									</Icon>
									<Input
										placeholder="Password"
										paddingLeft={10}
										h={10}
										w={"full"}
										onChange={handleChange}
										name="password"
										type={
											showPassword ? "text" : "password"
										}
									/>
									<Button
										onClick={() =>
											setShowPassword(
												(prevShow) => !prevShow,
											)
										}
										position={"absolute"}
										right={0}
										variant={"outline"}
										fontSize={"20px"}>
										{!showPassword ? (
											<IEyeOpen />
										) : (
											<IEyeClose />
										)}
									</Button>
								</HStack>
							</div>

							<Button
								colorPalette={"#ffe170"}
								bgColor={"f7d4e1"}
								rounded={"2xl"}
								variant={"outline"}
								padding={6}
								marginBottom={8}
								onClick={() => handleSubmit()}>
								{loading ? <Loader /> : "Create Account"}
								{/* <Loader /> */}
							</Button>
						</form>
						<div className="flex items-center my-8">
							<div className="grow h-px bg-gray-300" />
							<span className="px-4 text-gray-700">
								<b>or register with</b>
							</span>
							<div className="grow h-px bg-gray-300" />
						</div>

						<Link to={"../login/google"}>
							<Icon m={8} fontSize={"50px"}>
								<Google />
							</Icon>
						</Link>
						<Text>
							Already have an account?{" "}
							<Link to={"../login"}>
								<b>Log in</b>
							</Link>
						</Text>
					</Box>
				</div>
				<div className="bg-primary h-10 "></div>
			</Flex>
		</div>
	);
}
