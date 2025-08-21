"use client";
import { Instagram, X } from "lucide-react";
import { GlowButton } from "../buttons/glow-button";
import LogoDiscord from "../logo/logo-dc";
import { motion } from "framer-motion";
import Sparkles from "../decoration/sparkles";

export function JoinNow() {
	return (
		<section className="relative flex items-center justify-center px-4 py-24 overflow-hidden border-t-1 border-white/5">
			<div className="text-center max-w-2xl mx-auto">
				{/* Join Now Label */}
				<div className="flex items-center justify-center gap-4 mb-8">
					<div className="h-px bg-gradient-to-r from-transparent to-white/30 w-16"></div>
					<span className="text-white/60 text-sm font-medium tracking-wider uppercase">
						Join Now
					</span>
					<div className="h-px bg-gradient-to-l from-transparent to-white/30 w-16"></div>
				</div>

				{/* Main Heading */}
				<h1 className="text-[44px] md:text-5xl  mb-4 leading-tight">
					<span className="text-white/60">Fortune Favors The </span>
					<span className="text-white font-semibold">Bold</span>
				</h1>

				{/* Subtitle */}
				<p className="text-white/60 text-md mb-6">
					Jangan sia-siakan waktu Anda
				</p>

				{/* CTA Button */}
				<div className="mb-7">
					<GlowButton>Gabung Sekarang</GlowButton>
				</div>

				{/* Social Media Icons */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.8 }}
					className="flex items-center justify-center gap-12 mt-4"
				>
					{" "}
					<div className="flex items-center justify-center">
						<X className="w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer" />
					</div>
					{/* Divider */}
					<div className="w-px h-8 bg-gray-600"></div>
					{/* Instagram Icon */}
					<div className="flex items-center justify-center">
						<Instagram className="w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer" />
					</div>
					{/* Divider */}
					<div className="w-px h-8 bg-gray-600"></div>
					{/* Discord Icon */}
					<div className="flex items-center justify-center">
						<LogoDiscord size={24} />
					</div>
				</motion.div>

				{/* Email */}
				<div className="text-center mt-7 text-lg text-gray-300 underline ">
					WealthWorks.management@gmail.com
				</div>
			</div>

			<Sparkles />
			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
				<div className="w-[500px] h-[350px] bg-gradient-to-t from-indigo-500/30 via-gray-300/12 to-transparent rounded-full blur-[100px]"></div>
			</div>
		</section>
	);
}
