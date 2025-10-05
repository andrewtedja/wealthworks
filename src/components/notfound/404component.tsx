"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sparkles from "../decoration/sparkles";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-[#05070E] text-white flex items-center justify-center relative overflow-hidden">
			{/* Large 404 Background Text */}
			<div className="absolute inset-0 flex items-center justify-center">
				<motion.div
					className="text-[40vw] md:text-[25rem] font-bold text-gray-800/20 select-none leading-none"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					404
				</motion.div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<h1 className="text-5xl md:text-6xl font-bold mb-4">
						Whoa!
					</h1>
					<h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-200">
						That didn&apos;t work out.
					</h2>
					<p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">
						Halaman yang Anda cari tidak dapat ditemukan.
					</p>

					<Link href="/courses">
						<motion.button
							className="inline-flex items-center gap-3 bg-gray-900/80 hover:bg-gray-800/80 border border-gray-700/50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 backdrop-blur-sm"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<ArrowLeft className="w-4 h-4" />
							Balik ke home
						</motion.button>
					</Link>
				</motion.div>
			</div>

			{/* Animated Sparkles */}
			<Sparkles />
		</div>
	);
}
