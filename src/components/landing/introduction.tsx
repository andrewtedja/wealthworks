"use client";

import { Star } from "lucide-react";
import LogoSmall from "../logo/logo-small";
import { motion } from "framer-motion";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
});

export default function Introduction() {
	return (
		<section id="introduction" className="relative py-20 px-6 bg-[#05070C]">
			<div className="max-w-4xl mx-auto text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.8 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					className="inline-flex items-center gap-2 mb-8 border-white/5 border-1 rounded-xl px-3 py-1"
				>
					<div className="w-4 h-4 bg-black rounded-full flex items-center justify-center ">
						<Star className="text-white/80" fill="white" />
					</div>
					<span className="text-white/80 text-xs font-light tracking-wide">
						INTRODUCING Bryan & Enzo
					</span>
				</motion.div>

				{/* Quote */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.2, ease: "easeInOut" }}
					className="mb-12"
				>
					<h1 className="text-3xl text-gray-400 font-light leading-tight mb-8">
						&quot; True
						<span
							className={`font-medium ml-2 mr-1 text-white ${instrumentSerif.className}`}
							style={{ fontStyle: "italic" }}
						>
							Wealth
						</span>{" "}
						is found in the knowledge we share &quot;
					</h1>
				</motion.div>

				{/* Founder attribution */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 1.2, ease: "easeInOut" }}
					className="flex items-center justify-center gap-3"
				>
					<div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-1 border-white">
						<LogoSmall size={48} />
					</div>
					<span className="text-gray-400 text-sm">
						Founder of WealthWorks
					</span>
				</motion.div>
			</div>

			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2, ease: "easeInOut" }}
				>
					<div className="w-[500px] h-[250px] bg-gradient-to-t from-indigo-500/15 via-blue-500/8 to-transparent rounded-full blur-3xl"></div>
				</motion.div>
			</div>
		</section>
	);
}
