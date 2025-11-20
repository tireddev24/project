import {Avatar, Box, Button, Icon, Text} from "@chakra-ui/react";
import {BsThreeDots} from "react-icons/bs";

interface PostCardProps {
	name: string;
	time: string;
	text: string;
	avatarUrl: string;
}

export default function PostCard({name, time, text, avatarUrl}: PostCardProps) {
	return (
		<Box shadow={"md"} rounded={"md"} p={2}>
			<div className="w-full bg-white p-4 rounded-lg border-2 flex flex-col gap-3">
				{/* Header */}
				<Box padding={1} ring={2} ringColor={"gray.200"}>
					<div className="flex justify-between items-start">
						<div className="flex items-center gap-3 relative">
							<Avatar.Root size={"md"} key={"size"}>
								<Avatar.Fallback name={name} />
								<Avatar.Image src={avatarUrl} />
							</Avatar.Root>

							<div className="flex gap-2  leading-tight">
								<span className="font-semibold text-gray-900">
									{name}
								</span>
								<span className="text-sm text-gray-500">
									{time}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="sm"
								className="text-gray-600 font-medium hover:text-gray-900">
								Subscribe
							</Button>

							<Icon>{<BsThreeDots />}</Icon>
						</div>
					</div>

					{/* Post Text */}
					<Text p={2} marginLeft={0} w={"full"}>
						<p className="text-gray-700 text-[15px] ">{text}</p>
					</Text>
				</Box>
			</div>
		</Box>
	);
}
