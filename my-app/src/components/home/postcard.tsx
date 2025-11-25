import Timedate from "@/reusable/timedate";
import {Avatar, Box, Button, HStack, Icon, Text} from "@chakra-ui/react";
import {BsThreeDots} from "react-icons/bs";

interface PostCardProps {
	name: string;
	time: string;
	text: string;
	avatarUrl: string;
	tags: any;
	moodCategory?: string;
}

export default function PostCard({
	name,
	time,
	text,
	avatarUrl,
	moodCategory,
	tags,
}: PostCardProps) {
	return (
		<Box shadow={"md"} rounded={"md"} p={2}>
			<div className="w-[550px] bg-white p-4 rounded-lg border-2 flex flex-col gap-3">
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
									<Timedate date={time} />
								</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="sm"
								className="text-gray-600 font-medium hover:text-gray-900">
								{moodCategory || "Mood"}
							</Button>

							<Icon>{<BsThreeDots />}</Icon>
						</div>
					</div>

					{/* Post Text */}
					<Text p={2} marginLeft={0} w={"full"}>
						<p className="text-gray-700 text-[15px] ">{text}</p>
						<HStack mt={2}>
							{tags.map((tag: any, key: any) => (
								<span
									key={key}
									className="text-gray-400 text-[10px] ">
									#{tag.tag.name}
								</span>
							))}
						</HStack>
					</Text>
				</Box>
			</div>
		</Box>
	);
}
