import {Image} from "@chakra-ui/react";
import hero from "../assets/hero.png";

const Landing = () => {
	return (
		<div>
			<Image src={hero} objectFit={"cover"} h={"650px"} />
		</div>
	);
};

export default Landing;
