"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 2000);
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-[#05070E] flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					{/* Logo */}
					<div className="text-center mb-8">
						<div className="relative inline-flex items-center justify-center w-16 h-16 bg-[#05070C] rounded-2xl border border-gray-800/50 mb-4">
							<div className="absolute inset-0 bg-[#A6DAFF]/20 rounded-2xl blur-xl"></div>
							<div className="absolute inset-0 bg-[#A6DAFF]/10 rounded-2xl blur-md"></div>
							<span className="relative text-2xl font-bold text-white">
								W
							</span>
						</div>
						<h1 className="text-2xl font-bold text-white mb-2">
							WealthWorks
						</h1>
					</div>

					<Card className="bg-[#05070C]/80 backdrop-blur-xl border border-gray-800/30 shadow-2xl">
						<CardHeader className="text-center space-y-4">
							<div className="mx-auto w-16 h-16 bg-[#A6DAFF]/20 rounded-full flex items-center justify-center">
								<Mail className="w-8 h-8 text-[#A6DAFF]" />
							</div>
							<CardTitle className="text-2xl text-white">
								Check Your Email
							</CardTitle>
							<CardDescription className="text-gray-400">
								We&apos;ve sent password reset instructions to{" "}
								<span className="text-white font-medium">
									{email}
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
								<p className="text-sm text-gray-300">
									If you don&apos;t see the email in your
									inbox, please check your spam folder. The
									reset link will expire in 24 hours.
								</p>
							</div>

							<Link href="/auth">
								<Button className="w-full bg-[#A6DAFF] hover:bg-[#A6DAFF]/90 text-black font-medium transition-all duration-200">
									Back to Login
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#05070E] flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<div className="relative inline-flex items-center justify-center w-16 h-16 bg-[#05070C] rounded-2xl border border-gray-800/50 mb-4">
						<div className="absolute inset-0 bg-[#A6DAFF]/20 rounded-2xl blur-xl"></div>
						<div className="absolute inset-0 bg-[#A6DAFF]/10 rounded-2xl blur-md"></div>
						<span className="relative text-2xl font-bold text-white">
							W
						</span>
					</div>
					<h1 className="text-2xl font-bold text-white mb-2">
						WealthWorks
					</h1>
				</div>

				<Card className="bg-[#05070C]/80 backdrop-blur-xl border border-gray-800/30 shadow-2xl">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-white">
							Reset Password
						</CardTitle>
						<CardDescription className="text-gray-400">
							Enter your email address and we&apos;ll send you a
							link to reset your password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#A6DAFF] focus:ring-[#A6DAFF]/20 backdrop-blur-sm transition-all duration-200"
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-[#A6DAFF] hover:bg-[#A6DAFF]/90 text-black font-medium transition-all duration-200"
								disabled={isLoading}
							>
								{isLoading ? "Sending..." : "Send Reset Link"}
							</Button>
						</form>

						<div className="mt-6 pt-6 border-t border-gray-800/50">
							<Link
								href="/auth"
								className="flex items-center justify-center text-sm text-gray-300 hover:text-[#A6DAFF] transition-colors duration-200"
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
