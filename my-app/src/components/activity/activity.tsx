import {Heading, VStack} from "@chakra-ui/react";
import ActivityCard from "./activitycard";

const Activity = () => {
	return (
		<VStack padding={4} bg={"white"} alignItems={"start"}>
			<Heading>Activity</Heading>
			<ActivityCard
				avatar_url=".."
				name="New Follower"
				text="Bola Rufai followed you"
				btn_text="Follow back"
			/>
		</VStack>
	);
};

export default Activity;
