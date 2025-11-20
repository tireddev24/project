import {Box, Flex, HStack, Icon, Input, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {Search} from "../ui/icons";
import ChatCard from "./chatcard";

const Chat = () => {
	const chats = [
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

	const [messages, setMessages] = useState(0);

	return (
		<VStack padding={4} bg={"white"}>
			<VStack h={"10/12"}>
				<HStack position={"relative"}>
					<Icon position={"absolute"} fontSize={"28px"} left={2}>
						<Search />
					</Icon>

					<Input
						placeholder="Search chats"
						h={14}
						paddingLeft={12}
						rounded={"2xl"}
						w={96}
					/>
				</HStack>
				<Flex className="gap-14" margin={4}>
					<Box padding={2} rounded={"md"}>
						All
					</Box>
					<Box rounded={"md"} padding={2} shadow={"xl"}>
						Unread
					</Box>
				</Flex>
				{messages < 1 && (
					<VStack>
						<Text>You don't have any messages yet</Text>

						<Box className="bg-primary rounded-xl" p={6}>
							Send a message
						</Box>
					</VStack>
				)}

				{messages > 0 && (
					<div>
						{chats.map((chat) => (
							<ChatCard
								name={chat.name}
								text={chat.text}
								time={chat.time}
								avatarUrl={chat.avatarUrl}
							/>
						))}
					</div>
				)}
			</VStack>
		</VStack>
	);
};

export default Chat;
