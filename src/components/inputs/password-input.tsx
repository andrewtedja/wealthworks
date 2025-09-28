"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

export default function PasswordInput() {
	const [password, setPassword] = useState("");

	const rules = [
		{ test: (val: string) => val.length >= 6, label: "Minimal 6 karakter" },
		{ test: (val: string) => /[a-z]/.test(val), label: "Ada huruf kecil" },
		{ test: (val: string) => /[A-Z]/.test(val), label: "Ada huruf besar" },
		{ test: (val: string) => /[0-9]/.test(val), label: "Ada angka" },
	];

	return (
		<div className="space-y-2">
			<Input
				id="password"
				name="password"
				type="password"
				placeholder="Masukkan password kamu"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 
                   border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 
                   text-white placeholder:text-gray-400 
                   focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 
                   transition-all duration-300 rounded-lg"
			/>

			<ul className="text-xs space-y-1 mt-2">
				{rules.map((rule, i) => {
					const passed = rule.test(password);
					return (
						<li key={i} className="flex items-center gap-2">
							{passed ? (
								<Check className="w-4 h-4 text-green-400" />
							) : (
								<X className="w-4 h-4 text-red-400" />
							)}
							<span
								className={
									passed ? "text-green-400" : "text-red-400"
								}
							>
								{rule.label}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
