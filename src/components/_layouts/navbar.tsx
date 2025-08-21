"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import LogoFull from "../logo/logo-full";
import Link from "next/link";

const navItems = [
	{ name: "Home", href: "#" },
	{ name: "Data Source", href: "#source" },
	{ name: "Join", href: "#pricing" },
	{ name: "Contact", href: "#" },
	{ name: "Updates", href: "#" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<>
			<nav className="fixed top-0 left-0 w-full z-40 bg-black/20 border-b border-white/10 backdrop-blur-xl shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<div className="flex-shrink-0">
							<LogoFull size={150} />
						</div>

						<div className="hidden md:block">
							<nav className="border border-gray-500/30 rounded-full px-6 py-1">
								<div className="flex items-center space-x-4">
									{navItems.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
										>
											{item.name}
										</a>
									))}
								</div>
							</nav>
						</div>

						<div className="hidden md:flex items-center space-x-4">
							<Link
								href={`/auth?tab=login`}
								className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
							>
								Login
							</Link>

							<Button
								asChild
								variant="outline"
								className="bg-gradient-to-br from-[#10121A] to-[#212327] hover:bg-gradient-to-tr hover:from-[#10121A] hover:to-[#212327] border-gray-600 text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 py-5 font-bold text-sm"
							>
								<Link href={`/auth?tab=signup`}>
									<Sparkles className="w-4 h-4 mr-2" />
									Sign Up
								</Link>
							</Button>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								onClick={toggleMenu}
								className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
							>
								{isOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ y: "-100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{
							duration: 0.4,
							ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
						}}
						className="fixed inset-0 z-50 bg-gradient-to-b from-[#05070E] via-[#0A0D16] to-[#05070E] md:hidden overflow-hidden"
					>
						{/* Background decorative elements */}
						<div className="absolute top-20 right-10 w-32 h-32 bg-[#A6DAFF]/5 rounded-full blur-2xl animate-pulse" />
						<div className="absolute bottom-32 left-8 w-24 h-24 bg-blue-400/5 rounded-full blur-xl animate-pulse delay-1000" />

						<div className="flex flex-col h-full relative z-10">
							{/* Header with logo and close button */}
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1, duration: 0.3 }}
								className="flex items-center justify-between p-6 border-b border-gray-800/30 backdrop-blur-sm"
							>
								<LogoFull size={150} />
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.9 }}
									onClick={toggleMenu}
									className="relative p-2 text-gray-400 hover:text-white focus:outline-none transition-colors duration-200 rounded-full hover:bg-white/5"
								>
									<X className="h-6 w-6" />
								</motion.button>
							</motion.div>

							{/* Navigation Items */}
							<div className="flex-1 px-5 py-3 space-y-2 overflow-y-auto">
								{navItems.map((item, index) => (
									<motion.div
										key={item.name}
										initial={{ x: -30, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2 + index * 0.1,
											duration: 0.4,
											ease: [0.22, 1, 0.36, 1],
										}}
									>
										<Link
											href={item.href}
											className="group block relative py-4 px-4 rounded-xl hover:bg-white/5 transition-all duration-300"
											onClick={toggleMenu}
										>
											<div className="flex items-center space-x-4">
												<span className="text-white text-xl font-medium group-hover:text-[#A6DAFF] transition-colors duration-300 group-hover:translate-x-1 transform">
													{item.name}
												</span>
											</div>

											{/* Hover line effect */}
											<div className="absolute bottom-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#A6DAFF]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
										</Link>
									</motion.div>
								))}
							</div>

							{/* Bottom section with CTA button */}
							<motion.div
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.4 }}
								className="p-6 space-y-4"
							>
								{/* Divider */}
								<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

								{/* Sign Up Button */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										className="w-full h-14 bg-gradient-to-r from-[#A6DAFF]/20 to-blue-400/20 hover:from-[#A6DAFF]/30 hover:to-blue-400/30 text-[#A6DAFF] border border-[#A6DAFF]/30 shadow-lg hover:shadow-xl hover:shadow-[#A6DAFF]/20 transition-all duration-300 relative overflow-hidden backdrop-blur-sm rounded-xl font-semibold text-lg group"
										onClick={toggleMenu}
									>
										{/* Background glow effect */}
										<div className="absolute inset-0 bg-gradient-to-r from-[#A6DAFF]/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

										{/* Button content */}
										<Link
											href="/login"
											className="relative flex items-center justify-center space-x-3"
										>
											<span>Login</span>
											<motion.div
												className="w-0 group-hover:w-2 h-2 bg-[#A6DAFF] rounded-full transition-all duration-300"
												initial={{ scale: 0 }}
												whileHover={{ scale: 1 }}
											/>
										</Link>
									</Button>
								</motion.div>

								{/* Additional info text */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.7, duration: 0.3 }}
									className="text-center text-gray-500 text-sm"
								>
									Start your wealth journey today
								</motion.p>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
