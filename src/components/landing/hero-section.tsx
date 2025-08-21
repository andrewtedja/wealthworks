"use client";

import { motion } from "framer-motion";
import { Instagram, X } from "lucide-react";
import Sparkles from "../decoration/sparkles";
import { GlowButton } from "../buttons/glow-button";
import LogoSmall from "../logo/logo-small";
import LogoDiscord from "../logo/logo-dc";

export function HeroSection() {
	return (
		<section className="relative min-h-screen pt-32 pb-40 flex items-center justify-center overflow-hidden bg-[#05070E]">
			{/* Video Background */}
			<video
				src="/videos/landing-page/hero-video-bg.mp4"
				autoPlay
				loop
				muted
				preload="none"
				playsInline
				poster="/images/landing-page/hero-video-bg.jpg"
				className="absolute inset-0 w-full h-full object-cover grayscale"
				style={{ backgroundColor: "rgba(204, 8, 8, 0)" }}
			/>
			{/* Dark overlay for readability */}
			<div className="absolute inset-0 bg-[#05070E]/80" />

			<div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-12"
				>
					{/* Logo */}
					<div className="flex flex-col items-center gap-4">
						<div className="flex flex-col items-center gap-8">
							{/* Logo Container with enhanced 3D effect - double square structure */}
							<div className="relative">
								{/* Outer glow ring */}
								<div className="absolute inset-0 bg-blue-400/15 rounded-2xl blur-lg "></div>

								{/* Bottom concentrated glow - brighter */}
								<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-blue-400/40 rounded-full blur-md"></div>
								<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-blue-300/40 rounded-full blur-sm"></div>
								<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-blue-200/50 rounded-full blur-xs"></div>

								<div className="relative bg-gradient-to-b from-black to-gray-900/90 rounded-2xl p-2 shadow-2xl border border-gray-700/40 backdrop-blur-sm">
									<div className="relative bg-black rounded-xl border border-gray-800/60 shadow-md shadow-blue-300/60">
										<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-blue-300/50 rounded-full blur-xs"></div>
										{/* Inner glow for 3D effect */}

										<div className="relative flex items-center justify-center w-20 h-20">
											<LogoSmall size={72} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7 }}
					className="flex items-center justify-center gap-2 mb-4"
				>
					<div className="relative">
						<div className="w-2 h-2 bg-[#A6DAFF] rounded-full" />
						<div className="absolute inset-0 w-2 h-2 bg-[#A6DAFF] rounded-full animate-ping opacity-50" />
					</div>
					<span className="text-gray-300 text-sm">
						What&apos;s New
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="text-5xl md:text-7xl font-bold mb-7 leading-tight"
					style={{
						fontFamily: "Inter, Inter Placeholder, sans-serif",
						fontSize: "72px",
						fontWeight: 500,
						letterSpacing: "-0.02em",
						textAlign: "center",
						color: "rgb(228, 233, 242)",
					}}
				>
					<span className="block">Setiap langkah tanpa ilmu,</span>
					<span className="block text-gray-400">
						akan membawa kamu pada
					</span>
					<span className="block text-gray-500">
						keputusan yang salah.
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="text-gray-300 text-md mb-4"
				>
					Siap untuk Belajar?
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.6 }}
					className="mb-12 relative"
				>
					<GlowButton>Join Komunitas Gratis Kami</GlowButton>

					<span
						className="absolute inset-0 flex items-center justify-center pointer-events-none"
						aria-hidden="true"
					>
						<span
							className="block rounded-full"
							style={{
								width: "220px",
								height: "60px",
								filter: "blur(32px)",
								background:
									"radial-gradient(oval, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 80%, transparent 100%)",
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								zIndex: -1,
							}}
						/>
					</span>
				</motion.div>

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
			</div>
			<Sparkles />
		</section>
	);
}
