import {Avatar, HStack, Input, VStack} from "@chakra-ui/react";
import PostCard from "./postcard";

const Home = () => {
	const posts = [
		{
			name: "Ayeni Oyinkansola",
			time: "2d",
			avatarUrl: "/avatar.jpg",
			text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
		},
		{
			name: "Ayeni Oyinkansola",
			time: "2d",
			avatarUrl: "/avatar.jpg",
			text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
		},
		{
			name: "Ayeni Oyinkansola",
			time: "2d",
			avatarUrl: "/avatar.jpg",
			text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
		},
		{
			name: "Ayeni Oyinkansola",
			time: "2d",
			avatarUrl: "/avatar.jpg",
			text: "Today, I had an amazing day hanging out with people of common interest. I also met up with some of my old friends and it was lovely seeing them after a long time.",
		},
	];

	return (
		<VStack padding={4} className="bg-white w-[800px]">
			<VStack overflowY={"scroll"} h={"11/12"}>
				<HStack position={"relative"} marginBottom={"10"}>
					<Avatar.Root
						position={"absolute"}
						left={2}
						size={"md"}
						key={"size"}>
						<Avatar.Fallback name="Michael Amao" />
						<Avatar.Image src="" />
					</Avatar.Root>

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
							name={post.name}
							time={post.time}
							avatarUrl={post.avatarUrl}
							text={post.text}
						/>
					))}
				</VStack>
			</VStack>
			{/* </div> */}
		</VStack>
	);
};

export default Home;
