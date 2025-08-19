import type React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CircleArrowOutUpRight } from "lucide-react";

interface GlowButtonTwoProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
}

export function GlowButtonTwo({
	children,
	className,
	...props
}: GlowButtonTwoProps) {
	return (
		<button
			className={cn(
				// Base styles
				"relative px-10 py-3 w-full rounded-xl bg-black/80 text-white text-sm font-medium",
				"border-2 border-gray-600/50 backdrop-blur-sm blur-out-3xl",
				"transition-all duration-500 ease-out",
				"overflow-hidden group",
				// Hover effects
				"hover:border-gray-400/80",
				className
			)}
			{...props}
		>
			{/* Radial gradient semi-circle at bottom */}
			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-8 bg-gradient-radial from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl" />

			{/* Background glow effect */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent w-48 group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]" />

			{/* Animated expanding glow from center */}
			<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

			{/* Content */}
			<span className="relative z-10 flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	);
}
