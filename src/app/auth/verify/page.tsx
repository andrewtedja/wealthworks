"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
	const [isResending, setIsResending] = useState(false);
	const [resendCount, setResendCount] = useState(0);
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handleResendEmail = async () => {
		setIsResending(true);
		setResendCount((prev) => prev + 1);
		setCountdown(60); // 60 second cooldown

		// Simulate API call
		setTimeout(() => {
			setIsResending(false);
		}, 2000);
	};

	return (
		<div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#05070E]">
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A6DAFF]/8 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/6 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#A6DAFF]/10 rounded-full blur-3xl animate-pulse delay-500" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="text-center mb-8">
					<div className="relative inline-flex items-center justify-center mb-6">
						{/* Outer glow ring */}
						<div className="absolute inset-0 bg-blue-400/15 rounded-2xl blur-lg w-20 h-20"></div>

						{/* Bottom concentrated glow */}
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-blue-400/40 rounded-full blur-md"></div>
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-blue-300/40 rounded-full blur-sm"></div>
						<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-blue-200/50 rounded-full blur-xs"></div>

						<div className="relative bg-gradient-to-b from-black to-gray-900/90 rounded-2xl p-2 shadow-2xl border border-gray-700/40 backdrop-blur-sm">
							<div className="relative bg-black rounded-xl border border-gray-800/60 shadow-md shadow-blue-300/60 w-16 h-16 flex items-center justify-center">
								<span className="relative text-2xl font-bold text-white">
									W
								</span>
							</div>
						</div>
					</div>
					<h1 className="text-3xl font-medium text-white mb-2">
						WealthWorks
					</h1>
				</div>

				<Card className="bg-gradient-to-b from-[#05070C] to-[#05070C] rounded-2xl border border-gray-700/20 border-t-[#505050] border-b-gray-200/5 border-l-[#242323] border-r-[#252525] shadow-2xl relative overflow-hidden">
					<CardHeader className="relative text-center space-y-4">
						<div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[#05070C] to-[#12141f] rounded-md border border-t-[#303031] border-b-0 border-l-[#161616] border-r-[#191818] flex items-center justify-center shadow-lg">
							<div className="bg-[#14161F] rounded-md p-4 border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10">
								<Mail className="w-8 h-8 text-[#A6DAFF]" />
							</div>
						</div>
						<CardTitle className="text-2xl text-white font-medium">
							Check Your Email
						</CardTitle>
						<CardDescription className="text-gray-400">
							We&apos;ve sent a verification link to your email
							address. Please check your inbox and click the link
							to verify your account.
						</CardDescription>
					</CardHeader>
					<CardContent className="relative space-y-6">
						<div className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 rounded-lg p-4 shadow-lg">
							<div className="flex items-start space-x-3">
								<CheckCircle className="w-5 h-5 text-[#A6DAFF] mt-0.5 flex-shrink-0" />
								<div className="space-y-1">
									<p className="text-sm font-medium text-white">
										What&apos;s next?
									</p>
									<ul className="text-sm text-gray-300 space-y-1">
										<li>• Check your email inbox</li>
										<li>
											• Look for an email from WealthWorks
										</li>
										<li>• Click the verification link</li>
										<li>• Return here to continue</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<p className="text-sm text-gray-400 text-center">
								Didn&apos;t receive the email? Check your spam
								folder or request a new one.
							</p>

							<Button
								onClick={handleResendEmail}
								disabled={isResending || countdown > 0}
								variant="outline"
								className="w-full bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white hover:bg-[#A6DAFF]/10 hover:border-[#A6DAFF]/30 hover:text-[#A6DAFF] disabled:opacity-50 transition-all duration-300"
							>
								{isResending ? (
									<>
										<RefreshCw className="w-4 h-4 mr-2 animate-spin" />
										Sending...
									</>
								) : countdown > 0 ? (
									`Resend in ${countdown}s`
								) : (
									"Resend Verification Email"
								)}
							</Button>

							{resendCount > 0 && (
								<p className="text-xs text-[#A6DAFF] text-center">
									Verification email sent! ({resendCount})
								</p>
							)}
						</div>

						<div className="pt-4 border-t border-gray-700/50">
							<div className="flex flex-col space-y-2">
								<Link href="/auth">
									<Button
										variant="ghost"
										className="w-full text-gray-300 hover:text-[#A6DAFF] hover:bg-[#14161F]/50 backdrop-blur-sm transition-all duration-300"
									>
										Back to Login
									</Button>
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="text-center mt-6">
					<p className="text-gray-400 text-sm">
						Having trouble?{" "}
						<Link
							href="/support"
							className="text-[#A6DAFF] hover:text-blue-300 transition-colors"
						>
							Contact our support team
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
