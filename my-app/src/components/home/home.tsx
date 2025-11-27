import {HStack, Input, Text, VStack} from "@chakra-ui/react";
import PostCard from "./postcard";

// interface HomeProps {
// 	id: string;
// 	firstname: string;
// 	lastname: string;
// 	username: string;
// 	email: string;
// 	createdAt: string;
// 	updatedAt: string;
// }

import {useAuth} from "@/context/AuthContext";
import AvatarCard from "@/reusable/avatarcard";
import {useLikeStore, usePostStore} from "@/store/store";
import {useEffect, useState} from "react";
import Spin from "../ui/spinner";

const Home = () => {
	const {posts, fetchPosts} = usePostStore();

	const {fetchAllLikes} = useLikeStore();

	const {user: user1} = useAuth();

	const [Load, setLoad] = useState(true);

	// console.log(posts);

	// fetchPosts on

	useEffect(() => {
		const data = async () => {
			try {
				await fetchPosts();
				await fetchAllLikes();
			} catch (error) {
				console.error(error);
			} finally {
				setLoad(false);
			}
		};
		data();
	}, []);

	if (Load) {
		return (
			<VStack
				// position={"absolute"}
				left={0}
				top={2}
				h={"700px"}
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
			<VStack h={"700px"}>
				<HStack position={"sticky"} marginBottom={"10"}>
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
					{posts.length === 0 && (
						<Text fontSize="lg" color="gray.500" mt={10}>
							There are no posts at this time.
						</Text>
					)}

					{posts.map((post, key) => {
						// console.log(post.id);
						// console.log(post.likes.includes(user1.id));
						// post.likes.map((p) => {
						// 	p.id === p
						// });
						// if (post.likes.some((like) => like.id === user1.id)) {}
						return (
							<PostCard
								key={key}
								id={post.id}
								name={post.user.username}
								time={post.createdAt}
								avatarUrl={post.user.avatar!}
								text={post.caption}
								moodCategory={post.moodCategory}
								tags={post.tags!}
								liked={true}
								likes={post.likes}
							/>
						);
					})}
				</VStack>
			</VStack>
			{/* </div> */}
		</VStack>
	);
};

export default Home;
