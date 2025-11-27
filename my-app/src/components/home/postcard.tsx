import Timedate from "@/reusable/timedate";
import {useLikeStore} from "@/store/store";
import {Avatar, Box, Button, HStack, Icon, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {BsThreeDots} from "react-icons/bs";
import {ChatBubbleOutline, Heart, HeartFilled, Share} from "../ui/icons";
import {toaster} from "../ui/toaster";

interface PostCardProps {
	id: string;
	name: string;
	time: string;
	text: string;
	avatarUrl: string;
	tags: any;
	moodCategory?: string;
	liked: boolean;
}

export default function PostCard({
	id,
	name,
	time,
	text,
	avatarUrl,
	moodCategory,
	tags,
	liked,
}: PostCardProps) {
	const {likes, fetchLikes} = useLikeStore();

	useEffect(() => {
		const data = async () => {
			try {
				const res = await fetchLikes(id);
				// console.log(likes);
			} catch (error) {
				console.error(error);
			} finally {
				// setLoad(false);
			}
		};
		setTimeout(() => {
			data();
		}, 300);
	}, []);

	const [like, setLike] = useState(false);

	// console.log(likes);

	// const {likePost, posts} = usePostStore();

	const handleLike = async () => {
		// const {success, message} = await likePost(id);

		// success &&
		setLike((prev) => !prev);

		toaster.create({
			type: "info",
			closable: true,
			description: `You liked ${name}'s post`,
		});
	};

	const handleUnlike = async () => {
		// const {success, message} = await likePost(id);

		// success &&
		setLike((prev) => !prev);

		toaster.create({
			type: "info",
			closable: true,
			description: `You unliked ${name}'s post`,
		});
	};

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
			<HStack mt={2} justify={"center"}>
				<Button
					variant={"ghost"}
					onClick={like ? handleUnlike : handleLike}>
					{like ? (
						<HeartFilled fill="#f7d4e1" />
					) : (
						<Heart fill="#f7d4e1" />
					)}
				</Button>
				<Button variant={"ghost"}>
					<ChatBubbleOutline />
				</Button>
				<Button variant={"ghost"}>
					<Share />
				</Button>
			</HStack>
		</Box>
	);
}
