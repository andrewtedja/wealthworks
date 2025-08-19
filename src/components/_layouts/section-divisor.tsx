export default function SectionDivisor() {
	return (
		<div className="relative w-full flex justify-center">
			{/* Main divisor line */}
			<div className="relative w-full max-w-4xl h-px">
				{/* Base line */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />

				{/* Glow effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent blur-sm" />
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent blur-md" />

				{/* Center bright spot */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent blur-out-3xl blur-in-3xl" />
			</div>
		</div>
	);
}
