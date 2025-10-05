"use client";

import type React from "react";

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "react-international-phone";
import { useFormStatus } from "react-dom";
import "react-international-phone/style.css";
import { useRouter, useSearchParams } from "next/navigation";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import LogoSmall from "@/components/logo/logo-small";

export default function AuthPage() {
	return (
		<Suspense fallback={<Loader />}>
			<AuthPageContent />
		</Suspense>
	);
}

import { login, signup } from "@/lib/auth-actions";
import PasswordInput from "@/components/inputs/password-input";
import Loader from "@/components/loading/loader";

function SubmitButton({ text }: { text: string }) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			className="w-full bg-gradient-to-r from-[#A6DAFF]/20 to-blue-400/20 
                 hover:from-[#A6DAFF]/30 hover:to-blue-400/30 text-[#A6DAFF] 
                 border border-[#A6DAFF]/30 shadow-lg hover:shadow-xl 
                 transition-all duration-300 relative overflow-hidden 
                 backdrop-blur-sm py-5"
		>
			<div
				className="absolute inset-0 bg-gradient-to-r from-[#A6DAFF]/10 to-blue-400/10 
                      opacity-0 hover:opacity-100 transition-opacity duration-300"
			/>
			<span className="relative">{pending ? <Loader /> : text}</span>
		</Button>
	);
}

function AuthPageContent() {
	const [phone, setPhone] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	const [activeTab, setActiveTab] = useState("login");
	const defaultTab = searchParams.get("tab") || "login";

	const [loginError, setLoginError] = useState("");
	const [signupError, setSignupError] = useState("");

	useEffect(() => {
		setActiveTab(defaultTab);
	}, [defaultTab]);

	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
		router.replace(`/auth?tab=${newTab}`);
	};

	return (
		<div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#05070E]">
			{/* Video Background */}
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
			<div className="absolute inset-0 bg-[#05070E]/92" />

			<div className="relative z-10 w-full max-w-md">
				<div className="text-center mb-8">
					<div className="relative inline-flex items-center justify-center">
						<div className="relative bg-gradient-to-b from-black to-gray-900/90 rounded-2xl p-2 shadow-2xl border border-gray-700/40 backdrop-blur-sm">
							<div className="relative bg-black rounded-xl border border-gray-800/60 shadow-md shadow-blue-300/60 w-16 h-16 flex items-center justify-center">
								<LogoSmall size={36} />
							</div>
						</div>
					</div>
				</div>

				<Card className="bg-gradient-to-b from-[#05070C] to-[#05070C] rounded-2xl border border-gray-700/20 border-t-[#505050] border-b-gray-200/5 border-l-[#242323] border-r-[#252525] shadow-2xl relative overflow-hidden px-3 py-6">
					<CardHeader className="relative">
						<CardDescription className="text-center text-xl font-light text-gray-300">
							{activeTab === "login"
								? "Masuk Akun"
								: "Daftar Akun"}
						</CardDescription>
					</CardHeader>
					<CardContent className="relative">
						<Tabs
							value={activeTab}
							onValueChange={handleTabChange}
							className="w-full"
						>
							<TabsList className="grid w-full grid-cols-2 bg-[#14161F] backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 p-1 rounded-lg h-12">
								<TabsTrigger
									value="login"
									className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A6DAFF]/20 data-[state=active]:to-blue-400/20 data-[state=active]:text-[#A6DAFF] data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-[#A6DAFF]/30 text-gray-400 transition-all duration-300 rounded-md py-2"
								>
									Login
								</TabsTrigger>
								<TabsTrigger
									value="signup"
									className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A6DAFF]/20 data-[state=active]:to-blue-400/20 data-[state=active]:text-[#A6DAFF] data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-[#A6DAFF]/30 text-gray-400 transition-all duration-300 rounded-md py-2"
								>
									Sign Up
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="login"
								className="space-y-4 mt-6"
							>
								<form
									className="space-y-4"
									action={async (formData) => {
										try {
											await login(formData);
										} catch (error: unknown) {
											setLoginError(
												(error as { message: string })
													.message
											);
										}
									}}
								>
									{loginError && (
										<div className="flex items-center gap-3 p-3 mb-3 rounded-md bg-red-600 text-white text-sm font-semibold shadow-md">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 9v2m0 4h.01M5 19h14a2 2 
        0 002-2V7a2 2 0 00-2-2H5a2 2 
        0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
											<span>{loginError}</span>
										</div>
									)}

									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-white"
										>
											Email
										</Label>
										<Input
											id="email"
											type="email"
											name="email"
											placeholder="Masukkan alamat email"
											required
											className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white placeholder:text-gray-400 focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 transition-all duration-300 rounded-lg"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="password"
											className="text-white"
										>
											Password
										</Label>
										<Input
											id="password"
											type="password"
											name="password"
											placeholder="Masukkan password"
											required
											className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white placeholder:text-gray-400 focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 transition-all duration-300 rounded-lg"
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<input
												id="remember"
												type="checkbox"
												className="w-4 h-4 text-[#A6DAFF] bg-[#14161F] border-gray-600 rounded focus:ring-[#A6DAFF]/20 focus:ring-2"
											/>
											<Label
												htmlFor="remember"
												className="text-sm text-gray-300"
											>
												Ingat saya di login berikutnya
											</Label>
										</div>
										<Link
											href="/auth/forgot-password"
											className="text-sm text-[#A6DAFF] hover:text-blue-300 transition-colors"
										>
											Lupa Password?
										</Link>
									</div>
									<SubmitButton text="Login" />
								</form>
							</TabsContent>

							<TabsContent
								value="signup"
								className="space-y-4 mt-6"
							>
								<form
									className="space-y-4"
									action={async (formData) => {
										const password = formData.get(
											"password"
										) as string;
										const confirmPassword = formData.get(
											"confirmPassword"
										) as string;

										if (password !== confirmPassword) {
											setSignupError(
												"Password dan konfirmasi password tidak cocok"
											);

											return;
										}

										try {
											await signup(formData); // server action Supabase
											setSignupError("");
										} catch (error: unknown) {
											setSignupError(
												(error as { message: string })
													.message
											);
										}
									}}
								>
									{signupError && (
										<div className="flex items-center gap-2 p-3 mb-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 text-red-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 
        0 1.918-.816 1.994-1.85L21 19V7c0-1.054-.816-1.918-1.85-1.994L19 
        5H5c-1.054 0-1.918.816-1.994 1.85L3 7v12c0 
        1.054.816 1.918 1.85 1.994L5 21z"
												/>
											</svg>
											<p>{signupError}</p>
										</div>
									)}

									<div className="grid gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="username"
												className="text-white"
											>
												Username
											</Label>
											<Input
												id="firstName"
												name="username"
												type="text"
												placeholder="Masukkan username kamu"
												required
												className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white placeholder:text-gray-400 focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 transition-all duration-300 rounded-lg"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-white"
										>
											Email
										</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="Masukkan email kamu"
											required
											className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white placeholder:text-gray-400 focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 transition-all duration-300 rounded-lg"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="phone"
											className="text-white "
										>
											No Telpon (Whatsapp)
										</Label>
										<PhoneInput
											name="phone"
											defaultCountry="id"
											value={phone}
											onChange={(phone) =>
												setPhone(phone)
											}
											inputStyle={{
												backgroundColor:
													"rgba(20, 22, 31, 0.8)",
												backdropFilter: "blur(4px)",
												border: "1px solid",
												borderTopColor:
													"rgba(229, 231, 235, 0.2)",
												borderRightColor:
													"rgba(156, 163, 175, 0.1)",
												borderLeftColor:
													"rgba(156, 163, 175, 0.1)",
												borderBottomColor:
													"rgba(75, 85, 99, 0.2)",
												borderRadius: "0.5rem",
												color: "white",
												width: "100%",
												height: "2.5rem",
												fontSize: "0.875rem",
											}}
											countrySelectorStyleProps={{
												buttonStyle: {
													backgroundColor:
														"rgba(20, 22, 31, 0.8)",
													backdropFilter: "blur(4px)",
													border: "1px solid",
													borderTopColor:
														"rgba(229, 231, 235, 0.2)",
													borderRightColor:
														"rgba(156, 163, 175, 0.1)",
													borderLeftColor:
														"rgba(156, 163, 175, 0.1)",
													borderBottomColor:
														"rgba(75, 85, 99, 0.2)",
													borderRadius: "0.5rem",
													height: "2.5rem",
													padding: "0.5rem",
													margin: "0 0.2rem 0 0",
												},
											}}
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="password"
											className="text-white"
										>
											Password
										</Label>
										<PasswordInput />
									</div>
									<div className="space-y-2 mb-7">
										<Label
											htmlFor="confirmPassword"
											className="text-white"
										>
											Confirm Password
										</Label>
										<Input
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											placeholder="Masukkan ulang password kamu"
											required
											className="bg-[#14161F]/80 backdrop-blur-sm border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10 border-b-gray-600/20 text-white placeholder:text-gray-400 focus:border-[#A6DAFF]/50 focus:ring-2 focus:ring-[#A6DAFF]/20 transition-all duration-300 rounded-lg"
										/>
									</div>
									{/* <div className="flex items-center space-x-2">
										<input
											id="terms"
											type="checkbox"
											required
											className="w-4 h-4 text-[#A6DAFF] bg-[#14161F] border-gray-600 rounded focus:ring-[#A6DAFF]/20 focus:ring-2"
										/>
										<Label
											htmlFor="terms"
											className="text-sm text-gray-300"
										>
											I agree to the{" "}
											<Link
												href="/terms"
												className="text-[#A6DAFF] hover:text-blue-300"
											>
												Terms of Service
											</Link>{" "}
											and{" "}
											<Link
												href="/privacy"
												className="text-[#A6DAFF] hover:text-blue-300"
											>
												Privacy Policy
											</Link>
										</Label>
									</div> */}
									<SubmitButton text="Daftar" />
								</form>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				{/* <div className="text-center mt-6">
					<p className="text-gray-400 text-sm">
						Butuh bantuan?{" "}
						<Link
							href="/support"
							className="text-[#A6DAFF] hover:text-blue-300 transition-colors"
						>
							Hubungi support
						</Link>
					</p>
				</div> */}
				{activeTab == "login" ? (
					<div className="text-center mt-6">
						<p className="text-gray-400 text-sm">
							Belum punya akun?{" "}
							<Link
								href="/auth?tab=signup"
								className="text-[#A6DAFF] hover:text-blue-300 transition-colors"
							>
								Daftar disini
							</Link>
						</p>
					</div>
				) : (
					<div className="text-center mt-6">
						<p className="text-gray-400 text-sm">
							Sudah punya akun?{" "}
							<Link
								href="/auth?tab=login"
								className="text-[#A6DAFF] hover:text-blue-300 transition-colors"
							>
								Masuk disini
							</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
