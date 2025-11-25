import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {useAuth} from "@/context/AuthContext";
import AvatarCard from "@/reusable/avatarcard";

const Profile = () => {
	const {user} = useAuth();

	return (
		<VStack padding={4} bg={"white"} w={"700px"} alignItems={"start"}>
			<HStack gap={4}>
				<AvatarCard size="md" position={"relative"} user={user} />
				<VStack>
					<Heading as={"h1"}>{user.username}'s profile</Heading>
					<HStack>
						<Text>{user.firstname}</Text>
						<Text>{user.lastname}</Text>
					</HStack>
				</VStack>
			</HStack>
		</VStack>
	);
};

export default Profile;
