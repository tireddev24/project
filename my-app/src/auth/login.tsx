import {Email, Google, IEyeClose, IEyeOpen} from "@/components/ui/icons";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {IoLockClosedOutline} from "react-icons/io5";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

import Loader from "@/components/ui/load";
import {Toaster, toaster} from "@/components/ui/toaster";
import Nopage from "@/error/nopage";
import {useAuthHandler} from "@/hooks/useAuth";
import image from "../assets/bg.png";

const Login = () => {
	const location = useLocation();
	const path = location.pathname;

	const {handleLogin} = useAuthHandler();

	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		const login = (e: any) => {
			if (e.key === "Enter" && !form.password) {
				handleSubmit();
			}
		};
		window.addEventListener("keydown", login);

		return () => {
			window.removeEventListener("keydown", login);
		};
	});

	const [error, setError] = useState("");

	const handleChange = (e: any) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError("");

		console.log("logged");

		const {success, message} = await handleLogin(form);

		toaster.create({
			type: success ? "success" : "error",
			title: success ? "success" : "Error",

			description: success ? "Logged in" : message,
		});

		setLoading(false);

		if (success) {
			navigate("/feed");
		}
	};

	if (error) {
		return <Nopage />;
	}

	return (
		<div className="flex min-h-screen  justify-center items-center">
			<Toaster />
			<Flex className="*:h-[700px] *:min-w-[550px] ">
				<div className="bg-primary w-[500px] hidden lg:block">
					<Image src={image} />
				</div>
				<Outlet />
				{!path.includes("password") && (
					<div className="bg-white w-[550px]">
						<Box paddingY={20} paddingX={2} textAlign={"center"}>
							<Heading
								margin={10}
								textTransform={"uppercase"}
								fontSize={36}
								fontWeight={"700"}>
								Login
							</Heading>
							<form className="flex flex-col items-center gap-8 *:w-100">
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
											h={10}
											name="email"
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
											type={
												showPassword
													? "text"
													: "password"
											}
											name="password"
											w={"full"}
											onChange={handleChange}
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
									<Link to={"forgot-password"}>
										<Text marginTop={2} textAlign={"right"}>
											Forgot password?
										</Text>
									</Link>
								</div>

								<Button
									colorPalette={"#ffe170"}
									bgColor={"f7d4e1"}
									rounded={"2xl"}
									padding={6}
									marginBottom={8}
									onClick={() => handleSubmit()}>
									{loading ? <Loader /> : "Login"}
								</Button>
							</form>

							<div className="flex items-center my-8">
								<div className="grow h-px bg-gray-300" />
								<span className="px-4 text-gray-700">
									<b>or login with</b>
								</span>
								<div className="grow h-px bg-gray-300" />
							</div>

							<Link to={"../login/google"}>
								<Icon m={8} fontSize={"50px"}>
									<Google />
								</Icon>
							</Link>

							<Text>
								Not registered yet?{"  "}
								<Link to={"../register"}>
									<b>Create Account!</b>
								</Link>
							</Text>
						</Box>
					</div>
				)}
			</Flex>
		</div>
	);
};

export default Login;
