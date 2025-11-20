import {Heading, Text, VStack} from "@chakra-ui/react";

const Profile = () => {
	const user = {
		name: "Michael Amao",
		email: "michaelamao442@gmail.com",
	};

	return (
		<VStack padding={4} bg={"white"} alignItems={"start"}>
			<Heading as={"h1"}>{user.name}</Heading>
			<Text>{user.email}</Text>
		</VStack>
	);
};

export default Profile;
