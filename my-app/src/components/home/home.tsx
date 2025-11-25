import {HStack, Input, VStack} from "@chakra-ui/react";
import PostCard from "./postcard";

interface HomeProps {
	id: string;
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

import {useAuth} from "@/context/AuthContext";
import AvatarCard from "@/reusable/avatarcard";
import {usePostStore} from "@/store/store";
import {useEffect, useState} from "react";
import Spin from "../ui/spinner";

const Home = (user: any) => {
	const {posts, fetchPosts} = usePostStore();

	const {user: user1} = useAuth();

	const [Load, setLoad] = useState(true);

	// fetchPosts on

	useEffect(() => {
		const data = async () => {
			try {
				// const data =
				const res = await fetchPosts();
				// if ("res" in data && data.res === 401) {
				//   setExpired(true);
				// // }
				if ("res" in data) {
					console.log(posts);
				}
			} catch (error) {
				console.error(error);
				// setError(true);
			} finally {
				setLoad(false);
			}
		};
		setTimeout(() => {
			data();
		}, 300);
	}, []);

	// const posts = [
	// 	{
	// 		name: "Ayeni Oyinkansola",
	// 		time: "2d",
	// 		avatarUrl: "/avatar.jpg",
	// 		text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
	// 	},
	// 	{
	// 		name: "Ayeni Oyinkansola",
	// 		time: "2d",
	// 		avatarUrl: "/avatar.jpg",
	// 		text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
	// 	},
	// 	{
	// 		name: "Ayeni Oyinkansola",
	// 		time: "2d",
	// 		avatarUrl: "/avatar.jpg",
	// 		text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
	// 	},
	// 	{
	// 		name: "Ayeni Oyinkansola",
	// 		time: "2d",
	// 		avatarUrl: "/avatar.jpg",
	// 		text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
	// 	},
	// ];

	if (Load) {
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
		<VStack padding={4} className="bg-white w-[800px]">
			<VStack overflowY={"scroll"} h={"11/12"}>
				<HStack position={"relative"} marginBottom={"10"}>
					{/* <Avatar.Root
						position={"absolute"}
						left={2}
						size={"md"}
						key={"size"}>
						<Avatar.Fallback
							name={user1.firstname + " " + user1.lastname}
						/>
						<Avatar.Image src={user1.avatarUrl} />
					</Avatar.Root> */}

					<AvatarCard user={user1} />
					<Input
						placeholder="What's on your mind"
						h={14}
						paddingLeft={14}
						rounded={"2xl"}
						w={96}
					/>
				</HStack>
				{/* <div className="max-h-100 overflow-y-scroll"> */}
				<VStack spaceY={4}>
					{posts.map((post, key) => (
						<PostCard
							key={key}
							name={post.user.username}
							time={post.createdAt}
							avatarUrl={post.user.avatar!}
							text={post.caption}
							moodCategory={post.moodCategory}
							tags={post.tags!}
						/>
					))}
				</VStack>
			</VStack>
			{/* </div> */}
		</VStack>
	);
};

export default Home;
