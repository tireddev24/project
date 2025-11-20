import {Avatar, Button, Card, Flex, Heading, Text} from "@chakra-ui/react";

interface ActivityCardProps {
	name: string;
	text: string;
	btn_text: string;
	avatar_url: string;
}

const ActivityCard = ({
	name,
	avatar_url,
	text,
	btn_text,
}: ActivityCardProps) => {
	return (
		<div>
			<Card.Root size="sm">
				<Card.Header>
					<Flex alignItems={"center"}>
						<Avatar.Root size={"md"} key={"size"} margin={2}>
							<Avatar.Fallback name={name} />
							<Avatar.Image src={avatar_url} />
						</Avatar.Root>
						<Heading size="lg"> {name}</Heading>
					</Flex>
				</Card.Header>
				<Card.Body color="black">
					<Flex
						gap={10}
						marginLeft={14}
						justifyContent={"space-between"}
						w={"600px"}>
						<Text>{text}</Text>
						<Button colorPalette={"pink"}>{btn_text}</Button>
					</Flex>
				</Card.Body>
			</Card.Root>
		</div>
	);
};

export default ActivityCard;
