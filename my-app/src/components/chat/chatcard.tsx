import {Avatar, Box, Text} from "@chakra-ui/react";

interface ChatCardProps {
	name: string;
	time: string;
	text: string;
	avatarUrl: string;
}

const ChatCard = ({name, time, text, avatarUrl}: ChatCardProps) => {
	return (
		<Box shadow={"md"} rounded={"md"} p={2} m={2} bg={"white"}>
			<div className="w-full p-4 rounded-lg border-2 flex flex-col gap-3">
				{/* Header */}
				<Box padding={1} ring={2} ringColor={"gray.200"}>
					<div className="flex  items-center justify-between ">
						<Avatar.Root size={"md"} key={"size"} margin={2}>
							<Avatar.Fallback name={name} />
							<Avatar.Image src={avatarUrl} />
						</Avatar.Root>
						<div className="flex flex-col items-start">
							<div className="font-bold text-gray-900">
								{name}
							</div>
							<Text
								color={"gray.700"}
								marginLeft={0}
								w={"650px"}
								// lineClamp={"1"}
								truncate>
								{text}
							</Text>
						</div>
						<div className="text-sm  text-gray-500">{time}</div>
					</div>

					{/* Post Text */}
				</Box>
			</div>
		</Box>
	);
};

export default ChatCard;
