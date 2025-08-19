import React from "react";
import { Star } from "lucide-react";

interface BadgeProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
}

const Badge = ({ children, icon, className }: BadgeProps) => {
	return (
		<div
			className={`inline-flex items-center gap-2 mb-8 border-white/5 border-1 rounded-xl px-3 py-1 ${className}`}
		>
			{icon ? (
				icon
			) : (
				<div className="w-4 h-4 bg-black rounded-full flex items-center justify-center ">
					<Star className="text-white/80" fill="white" />
				</div>
			)}
			<span className="text-white/80 text-xs font-light tracking-wide">
				{children}
			</span>
		</div>
	);
};

export default Badge;
