"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	ChevronLeft,
	ChevronRight,
	CheckCircle,
	Circle,
	Play,
	Pause,
	Volume2,
	Maximize,
	Settings,
	Clock,
	Video,
	FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/_layouts/navbar";

// Mock data - same as course detail page
const courseData = {
	"crypto-basics": {
		id: "crypto-basics",
		title: "Crypto & Blockchain Basic: From History to Market Mastery",
		lessons: [
			{
				id: 1,
				title: "Pengenalan Blockchain Tech di Balik Cryptocurrency",
				type: "video",
				duration: "25 min",
				completed: false,
				description:
					"Understanding the fundamental technology behind cryptocurrencies",
				content: {
					videoUrl: "/blockchain-technology-explanation-video.png",
					transcript:
						"In this lesson, we explore the fundamental concepts of blockchain technology...",
				},
			},
			{
				id: 2,
				title: "Sejarah Dari Bitcoin",
				type: "video",
				duration: "30 min",
				completed: false,
				description: "The complete history and evolution of Bitcoin",
				content: {
					videoUrl: "/bitcoin-history-timeline.png",
					transcript:
						"Bitcoin was created in 2008 by the mysterious Satoshi Nakamoto...",
				},
			},
			{
				id: 4,
				title: "Crypto Market Cycle Theory",
				type: "text",
				duration: "20 min",
				completed: false,
				description: "Understanding market cycles in cryptocurrency",
				content: {
					text: `# Crypto Market Cycle Theory

## Introduction
Cryptocurrency markets are known for their volatility and cyclical nature. Understanding these cycles is crucial for any investor or trader looking to navigate the crypto space successfully.

## The Four Phases of Market Cycles

### 1. Accumulation Phase
- Market sentiment is bearish
- Prices are at or near bottom
- Smart money starts accumulating
- Low trading volume

### 2. Markup Phase  
- Prices start to rise
- Public interest increases
- Media coverage becomes positive
- FOMO (Fear of Missing Out) kicks in

### 3. Distribution Phase
- Prices reach peak levels
- Euphoria in the market
- Everyone is talking about crypto
- Smart money starts selling

### 4. Markdown Phase
- Prices decline rapidly
- Panic selling occurs
- Negative media coverage
- Market capitulation

## Key Indicators to Watch
- Market sentiment indicators
- On-chain metrics
- Trading volume patterns
- Social media trends

Understanding these cycles can help you make better investment decisions and avoid common pitfalls that trap retail investors.`,
				},
			},
		],
	},
};

interface LessonPageProps {
	params: {
		courseId: string;
		lessonId: string;
	};
}

export default function LessonPage({ params }: LessonPageProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(1500); // 25 minutes in seconds

	const course = courseData[params.courseId as keyof typeof courseData];

	if (!course) {
		notFound();
	}

	const lesson = course.lessons.find(
		(l) => l.id === Number.parseInt(params.lessonId)
	);

	if (!lesson) {
		notFound();
	}

	const currentLessonIndex = course.lessons.findIndex(
		(l) => l.id === lesson.id
	);
	const previousLesson =
		currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
	const nextLesson =
		currentLessonIndex < course.lessons.length - 1
			? course.lessons[currentLessonIndex + 1]
			: null;

	const progress = (currentTime / duration) * 100;

	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main className="container mx-auto px-4 py-6">
				<div className="grid lg:grid-cols-4 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-6">
						{/* Breadcrumb */}
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Link
								href="/courses"
								className="hover:text-foreground"
							>
								Courses
							</Link>
							<ChevronRight className="h-4 w-4" />
							<Link
								href={`/courses/${course.id}`}
								className="hover:text-foreground"
							>
								{course.title}
							</Link>
							<ChevronRight className="h-4 w-4" />
							<span>{lesson.title}</span>
						</div>

						{/* Video Player or Text Content */}
						<Card>
							<CardContent className="p-0">
								{lesson.type === "video" ? (
									<div className="relative bg-black rounded-lg overflow-hidden">
										<div className="aspect-video relative">
											<img
												src={
													lesson.content.videoUrl ||
													"/placeholder.svg"
												}
												alt={lesson.title}
												className="w-full h-full object-cover"
											/>

											{/* Video Controls Overlay */}
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center group">
												<Button
													size="lg"
													onClick={() =>
														setIsPlaying(!isPlaying)
													}
													className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white"
												>
													{isPlaying ? (
														<Pause className="h-8 w-8" />
													) : (
														<Play className="h-8 w-8" />
													)}
												</Button>
											</div>

											{/* Video Controls Bar */}
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
												<div className="space-y-2">
													<Progress
														value={progress}
														className="h-1"
													/>
													<div className="flex items-center justify-between text-white text-sm">
														<div className="flex items-center gap-4">
															<Button
																size="sm"
																variant="ghost"
																onClick={() =>
																	setIsPlaying(
																		!isPlaying
																	)
																}
																className="text-white hover:bg-white/20 p-1 h-8 w-8"
															>
																{isPlaying ? (
																	<Pause className="h-4 w-4" />
																) : (
																	<Play className="h-4 w-4" />
																)}
															</Button>
															<Volume2 className="h-4 w-4" />
															<span>
																{Math.floor(
																	currentTime /
																		60
																)}
																:
																{(
																	currentTime %
																	60
																)
																	.toString()
																	.padStart(
																		2,
																		"0"
																	)}{" "}
																/{" "}
																{Math.floor(
																	duration /
																		60
																)}
																:
																{(duration % 60)
																	.toString()
																	.padStart(
																		2,
																		"0"
																	)}
															</span>
														</div>
														<div className="flex items-center gap-2">
															<Settings className="h-4 w-4" />
															<Maximize className="h-4 w-4" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className="p-8">
										<div className="prose prose-slate dark:prose-invert max-w-none">
											<div className="whitespace-pre-wrap">
												{lesson.content.text}
											</div>
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Lesson Info */}
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<CardTitle className="text-xl">
											{lesson.title}
										</CardTitle>
										<p className="text-muted-foreground">
											{lesson.description}
										</p>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										{lesson.type === "video" ? (
											<Video className="h-4 w-4" />
										) : (
											<FileText className="h-4 w-4" />
										)}
										<Clock className="h-4 w-4" />
										<span>{lesson.duration}</span>
									</div>
								</div>
							</CardHeader>
						</Card>

						{/* Navigation */}
						<div className="flex items-center justify-between">
							{previousLesson ? (
								<Link
									href={`/courses/${course.id}/lessons/${previousLesson.id}`}
								>
									<Button
										variant="outline"
										className="flex items-center gap-2 bg-transparent"
									>
										<ChevronLeft className="h-4 w-4" />
										Previous Lesson
									</Button>
								</Link>
							) : (
								<div />
							)}

							<Button className="bg-[#A6DAFF] hover:bg-[#A6DAFF]/90 text-black">
								<CheckCircle className="h-4 w-4 mr-2" />
								Mark Complete
							</Button>

							{nextLesson ? (
								<Link
									href={`/courses/${course.id}/lessons/${nextLesson.id}`}
								>
									<Button
										variant="outline"
										className="flex items-center gap-2 bg-transparent"
									>
										Next Lesson
										<ChevronRight className="h-4 w-4" />
									</Button>
								</Link>
							) : (
								<div />
							)}
						</div>
					</div>

					{/* Lessons Sidebar */}
					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Course Lessons
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0">
								<div className="space-y-1">
									{course.lessons.map(
										(courseLesson, index) => (
											<Link
												key={courseLesson.id}
												href={`/courses/${course.id}/lessons/${courseLesson.id}`}
												className="block"
											>
												<div
													className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors border-b border-border/50 last:border-b-0 ${
														courseLesson.id ===
														lesson.id
															? "bg-[#A6DAFF]/10 dark:bg-[#A6DAFF]/5 border-l-2 border-l-[#A6DAFF]"
															: ""
													}`}
												>
													<div className="flex-shrink-0">
														{courseLesson.completed ? (
															<CheckCircle className="h-4 w-4 text-green-500" />
														) : (
															<Circle className="h-4 w-4 text-muted-foreground" />
														)}
													</div>

													<div className="flex-1 min-w-0">
														<div className="flex items-center gap-2 mb-1">
															<span className="text-xs text-muted-foreground font-medium">
																{String(
																	index + 1
																).padStart(
																	2,
																	"0"
																)}
																.
															</span>
															{courseLesson.type ===
															"video" ? (
																<Video className="h-3 w-3 text-muted-foreground" />
															) : (
																<FileText className="h-3 w-3 text-muted-foreground" />
															)}
														</div>
														<h4 className="font-medium text-sm leading-tight">
															{courseLesson.title}
														</h4>
														<div className="flex items-center gap-1 mt-1">
															<Clock className="h-3 w-3 text-muted-foreground" />
															<span className="text-xs text-muted-foreground">
																{
																	courseLesson.duration
																}
															</span>
														</div>
													</div>
												</div>
											</Link>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
