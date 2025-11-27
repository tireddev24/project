import {Button, Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {useAuth} from "@/context/AuthContext";
import AvatarCard from "@/reusable/avatarcard";
import {Link} from "react-router-dom";

const Profile = () => {
	const {user} = useAuth();

	return (
		<VStack padding={4} bg={"white"} w={"700px"} alignItems={"center"}>
			<HStack gap={8} alignSelf={"flex-start"}>
				<AvatarCard size="md" position={"relative"} user={user} />
				<VStack spaceY={-2}>
					<Heading as={"h1"}>{user.username}'s profile</Heading>
					<HStack>
						<Text>{user.firstname}</Text>
						<Text>{user.lastname}</Text>
					</HStack>
				</VStack>
			</HStack>
			<Link to={"../create"}>
				<Button margin={10}>Add New Post</Button>
			</Link>
		</VStack>
	);
};

export default Profile;
