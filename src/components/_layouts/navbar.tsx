"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import LogoFull from "../logo/logo-full";

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
							<a
								href="#"
								className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
							>
								Login
							</a>
							<Button
								variant="outline"
								className="bg-gradient-to-br from-[#10121A] to-[#212327] hover:bg-gradient-to-tr hover:from-[#10121A] hover:to-[#212327] border-gray-600 text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 py-5 font-bold text-sm"
							>
								<Sparkles className="w-4 h-4 mr-2" />
								Sign Up
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
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="fixed inset-0 z-50 bg-gray-900 md:hidden"
					>
						<div className="flex flex-col h-full">
							{/* Header with logo and close button */}
							<div className="flex items-center justify-between p-4 border-b border-gray-800">
								<h1 className="text-white text-2xl font-bold">
									<span className="text-4xl">W</span>
									ealthWorks
								</h1>
								<button
									onClick={toggleMenu}
									className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
								>
									<X className="h-6 w-6" />
								</button>
							</div>

							{/* Navigation Items */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1, duration: 0.3 }}
								className="flex-1 px-4 py-8 space-y-8"
							>
								{navItems.map((item, index) => (
									<motion.a
										key={item.name}
										href={item.href}
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2 + index * 0.1,
											duration: 0.3,
										}}
										className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
										onClick={toggleMenu}
									>
										{item.name}
									</motion.a>
								))}
							</motion.div>

							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4, duration: 0.3 }}
								className="p-6"
							>
								<Button
									className="w-full glass-morphism bg-gradient-to-r from-primary to-accent text-white border-0 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
									onClick={toggleMenu}
								>
									<Sparkles className="w-4 h-4 mr-2" />
									Sign Up
								</Button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
