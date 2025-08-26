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
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { resendVerification } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function VerifyPage({ email }: { email: string }) {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [, setError] = useState("");

	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		const interval = setInterval(async () => {
			const { data } = await supabase.auth.getUser();
			if (data.user?.email_confirmed_at) {
				clearInterval(interval);
				router.push("/courses");
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [router, supabase]);

	const handleResend = async () => {
		try {
			setLoading(true);
			setError("");
			await resendVerification(email);
			setSent(true);
		} catch (err: unknown) {
			setError(
				(err as { message: string })?.message ||
					"Gagal kirim ulang email"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#05070E]">
			<video
				src="/videos/landing-page/hero-video-bg.mp4"
				autoPlay
				loop
				muted
				preload="none"
				playsInline
				className="absolute inset-0 w-full h-full object-cover grayscale"
				style={{ backgroundColor: "rgba(204, 8, 8, 0)" }}
			/>
			{/* Dark overlay for readability */}
			<div className="absolute inset-0 bg-[#05070E]/72" />
			<div className="relative z-10 w-full max-w-md">
				<div className="text-center mb-8"></div>

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
								variant="outline"
								className="w-full bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white hover:bg-[#A6DAFF]/10 hover:border-[#A6DAFF]/30 hover:text-[#A6DAFF] disabled:opacity-50 transition-all duration-300"
								onClick={handleResend}
								disabled={loading || sent}
							>
								{loading
									? "Mengirim..."
									: sent
									? "Email terkirim!"
									: "Kirim Ulang Email"}
							</Button>
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
