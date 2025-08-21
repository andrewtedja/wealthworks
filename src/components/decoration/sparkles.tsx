import React from "react";
import { motion } from "framer-motion";

const Sparkles = () => {
	return (
		<div>
			<div className="absolute inset-0 pointer-events-none top-40">
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white rounded-full"
						style={{
							left: `${20 + i * 10}%`,
							bottom: `${10 + (i % 3) * 15}%`,
						}}
						animate={{
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 0.8,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Additional sparkles for more variety */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={`sparkle-${i}`}
						className="absolute"
						style={{
							left: `${30 + i * 8}%`,
							bottom: `${5 + (i % 4) * 10}%`,
						}}
					>
						<motion.div
							className="w-0.5 h-0.5 bg-white rounded-full"
							animate={{
								opacity: [0, 0.8, 0],
								scale: [0, 1.5, 0],
							}}
							transition={{
								duration: 2.5,
								repeat: Number.POSITIVE_INFINITY,
								delay: i * 0.8,
								ease: "easeInOut",
							}}
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Sparkles;
