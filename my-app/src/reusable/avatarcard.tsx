import {Avatar} from "@chakra-ui/react";

const AvatarCard = ({
	user,
	position,
	size,
}: {
	user: any;
	position?: string;
	size?: string;
}) => {
	return (
		<Avatar.Root
			position={position || "absolute"}
			left={2}
			size={"md"}
			key={"size"}>
			<Avatar.Fallback name={user.firstname + " " + user.lastname} />
			<Avatar.Image src={user.avatarUrl} />
		</Avatar.Root>
	);
};

export default AvatarCard;
