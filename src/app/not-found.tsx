import { Navbar } from "@/components/_layouts/navbar";
import AnimatedError404 from "@/components/notfound/404component";
import React from "react";

const NotFound = () => {
	return (
		<div>
			<Navbar />
			<AnimatedError404 />
		</div>
	);
};

export default NotFound;
