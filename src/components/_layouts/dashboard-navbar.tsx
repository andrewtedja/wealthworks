"use client";
import { useEffect, useState } from "react";
import {
	Search,
	ChevronDown,
	LogOut,
	User,
	Sun,
	Moon,
	Gem,
	Crown,
} from "lucide-react";
import LogoFull from "../logo/logo-full";
import { signout } from "@/lib/auth-actions";

export default function LoggedInNavbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleSignOut = async () => {
		await signout();
	};

	useEffect(() => {
		const root = document.documentElement;
		const init = root.classList.contains("dark");
		setIsDarkMode(init);
	}, []);

	// Helper to apply theme everywhere + persist
	const applyTheme = (dark: boolean) => {
		const root = document.documentElement;
		root.classList.toggle("dark", dark); // global class
		setIsDarkMode(dark); // local state
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch {}
		// 1 year cookie for SSR in app/layout.tsx
		document.cookie = `theme=${
			dark ? "dark" : "light"
		}; path=/; max-age=31536000; samesite=lax`;
	};

	const toggleTheme = () => applyTheme(!isDarkMode);

	// On mount, read the current class SSR set on <html> and sync
	useEffect(() => {
		setIsDarkMode(document.documentElement.classList.contains("dark"));
	}, []);

	// (Optional) keep tabs/windows in sync
	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === "theme" && e.newValue)
				applyTheme(e.newValue === "dark");
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	return (
		<nav
			className={`border-b px-6 py-3 shadow-sm "bg-[#05070E] border-gray-700 shadow-white/6`}
			// className={`border-b px-6 py-3 shadow-sm ${
			// 	isDarkMode
			// 		? "bg-[#05070E] border-gray-700 shadow-white/6"
			// 		: "bg-white border-gray-200"
			// }`}
		>
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				{/* Logo */}
				<div className="flex items-center">
					<LogoFull size={116} />
				</div>

				{/* Search Input */}
				<div className="flex-1 max-w-md mx-8">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
						<input
							type="text"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search..."
							className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm  bg-background placeholder-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-600 hover:border-gray-500`}
							// ${
							// 	isDarkMode
							// 		? "border-gray-600 bg-gray-800 text-white hover:border-gray-500"
							// 		: "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
							// }`}
						/>
					</div>
				</div>

				{/* Navigation Links and User Dropdown */}
				<div className="flex items-center space-x-6">
					{/* Nav Links */}
					<div className="flex items-center space-x-6">
						<a
							href="#"
							className={`font-medium text-sm ${
								isDarkMode
									? "text-gray-300 hover:text-blue-400"
									: "text-gray-700 hover:text-blue-600"
							}`}
						>
							Modul
						</a>
						<a
							href="#"
							className={`font-medium text-sm ${
								isDarkMode
									? "text-gray-300 hover:text-blue-400"
									: "text-gray-700 hover:text-blue-600"
							}`}
						>
							News
						</a>
						<a
							href="#"
							className={`font-medium text-sm ${
								isDarkMode
									? "text-gray-300 hover:text-blue-400"
									: "text-gray-700 hover:text-blue-600"
							}`}
						>
							Help
						</a>
					</div>

					{/* User Dropdown */}
					<div className="relative">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className={`flex items-center space-x-2 focus:outline-none ${
								isDarkMode
									? "text-gray-300 hover:text-blue-400"
									: "text-gray-700 hover:text-blue-600"
							}`}
						>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									isDarkMode ? "bg-gray-700" : "bg-gray-200"
								}`}
							>
								<User
									className={`h-4 w-4 ${
										isDarkMode
											? "text-gray-300"
											: "text-gray-600"
									}`}
								/>
							</div>
							<span className="font-medium text-sm">
								Gabung The Ambatukam
							</span>
							<ChevronDown className="h-4 w-4" />
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-68 bg-[#1c2336]  rounded-lg shadow-lg py-2 z-50">
								{/* Membership Info */}
								<div className="px-3 py-3 border-b border-gray-700">
									<div className="flex items-center space-x-2 mb-2">
										<div className="w-4 h-4 rounded-sm flex items-center justify-center">
											<Gem className="h-4 w-4 text-white" />
										</div>
										<span className="text-white font-semibold text-sm">
											The Ambatukam
										</span>
									</div>
									<div className="text-gray-400 text-xs mb-2">
										EXP MEMBER: 17 FEBRUARY 2026
									</div>
									<div className="flex items-center space-x-4 cursor-pointer bg-[#C8A051]/30 rounded-md px-3 py-3">
										<Crown className="h-5 w-5 text-yellow-400" />
										<span className="text-yellow-400 text-sm font-medium">
											Gabung The Nigga
										</span>
									</div>
								</div>

								{/* Dark/Light Mode Toggle */}
								<button
									onClick={() => {
										toggleTheme();
										setIsDarkMode(!isDarkMode);
									}}
									className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 flex items-center space-x-2 text-sm"
								>
									{isDarkMode ? (
										<>
											<Sun className="h-4 w-4" />
											<span>Light Mode</span>
										</>
									) : (
										<>
											<Moon className="h-4 w-4" />
											<span>Dark Mode</span>
										</>
									)}
								</button>

								{/* Divider */}
								<div className="border-t border-gray-700 my-1"></div>

								{/* Logout Button */}
								<button
									className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 flex items-center space-x-2 text-sm"
									onClick={handleSignOut}
								>
									<LogOut className="h-4 w-4" />
									<span>Logout</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Click outside to close dropdown */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsDropdownOpen(false)}
				></div>
			)}
		</nav>
	);
}
