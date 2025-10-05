"use client";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

import { motion } from "framer-motion";

const Loader = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.4 }}
		className="fixed inset-0 h-full w-full flex items-center justify-center"
	>
		<Spinner variant="pinwheel" />
	</motion.div>
);
export default Loader;
