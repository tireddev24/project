import Spin from "@/components/ui/spinner";
import {useAuth} from "@/context/AuthContext";
import {VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Home from "../components/home/home";

const Feed = () => {
	const {user} = useAuth();
	console.log(user);

	const [load, SetLoad] = useState(true);

	useEffect(() => {
		const data = async () => {
			try {
				await user;
			} catch (error) {
				console.log(error);
			} finally {
				SetLoad(false);
			}
		};

		setTimeout(() => {
			data();
		}, 300);
	}, []);

	if (load) {
		return (
			<VStack
				className="backdrop-brightness-50"
				position={"absolute"}
				left={0}
				top={2}
				h={"full"}
				minH={"100vh"}
				minW={"full"}
				justifyContent={"center"}>
				<div className="scale-150">
					{/* <Toaster /> */}
					<Spin />
				</div>
			</VStack>
		);
	}

	return (
		<div className="">
			<Home user={user} />
		</div>
	);
};

export default Feed;
