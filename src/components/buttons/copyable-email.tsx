import { useState } from "react";

export function CopyableEmail({ email }: { email: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy email:", err);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="group relative text-white/70 hover:text-white underline underline-offset-4 transition-all duration-300 hover:scale-105 cursor-pointer"
		>
			<span className="relative z-10">{email}</span>

			<div
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-lg border border-white/20 text-xs font-medium text-white shadow-lg transition-all duration-300 cursor-pointer ${
					copied ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				✓ Copied to clipboard!
			</div>

			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10 cursor-pointer"></div>
		</button>
	);
}
