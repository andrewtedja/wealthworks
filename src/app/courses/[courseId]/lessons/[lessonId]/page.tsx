"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	CheckCircle,
	Circle,
	Video,
	FileText,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";
import type Lesson from "@/types/lesson";

interface LessonPageProps {
	params: Promise<{ courseId: string; lessonId: string }>;
}
export default function LessonPage({ params }: LessonPageProps) {
	const { courseId, lessonId } = use(params);

	const [lesson, setLesson] = useState<Lesson | null>(null);
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [loadError, setLoadError] = useState<string | null>(null);

	// Fetch single lesson
	useEffect(() => {
		const fetchLesson = async () => {
			try {
				const res = await fetch(`/api/lessons/${lessonId}`);
				if (!res.ok) {
					setLoadError("Lesson not found");
					setLesson(null);
					return;
				}
				const data = await res.json();
				setLesson(data);
			} catch {
				setLoadError("Failed to load lesson");
			}
		};
		fetchLesson();
	}, [lessonId]);

	// Fetch lessons list for sidebar
	useEffect(() => {
		const fetchLessons = async () => {
			const res = await fetch(`/api/courses/${courseId}/lessons`);
			if (!res.ok) return;
			const data = await res.json();
			setLessons(data);
		};
		fetchLessons();
	}, [courseId]);

	// ---- PICK CURRENT / PREV / NEXT ----
	if (loadError)
		return (
			<div className="p-8 text-sm text-muted-foreground">{loadError}</div>
		);

	if (!lesson) return <div className="p-8">Loading...</div>;

	const idx = lessons.findIndex((l) => l.id === lesson.id);
	const previousLesson = idx > 0 ? lessons[idx - 1] : null;
	const nextLesson = idx < lessons.length - 1 ? lessons[idx + 1] : null;

	return (
		<div className="bg-background min-h-screen">
			<LoggedInNavbar />
			<main className="container mx-auto px-4 py-8 relative">
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
								href={`/courses/${courseId}`}
								className="hover:text-foreground"
							>
								{lesson.course?.title}
							</Link>
							<ChevronRight className="h-4 w-4" />
							<span>{lesson.title}</span>
						</div>

						{/* Video/Text Content */}
						<Card className="p-0 border-3 border-white/70">
							<CardContent className="p-0">
								{lesson.content_type === "video" ? (
									<div className="relative bg-black rounded-lg overflow-hidden">
										<div className="aspect-video relative">
											{/* For YouTube: swap <img> with an <iframe> when you’re ready */}
											<iframe
												src={`${lesson.content_url}?controls=1&autoplay=1&loop=1&mute=0&VIDEO_ID&modestbranding=1&rel=0`}
												title={lesson.title}
												className="w-full h-full"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
											/>
										</div>
									</div>
								) : (
									<div className="p-8">
										<div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap">
											{lesson.content_text || ""}
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
										{lesson.content_type === "video" ? (
											<Video className="h-4 w-4" />
										) : (
											<FileText className="h-4 w-4" />
										)}
									</div>
								</div>
							</CardHeader>
						</Card>

						{/* Navigation */}
						<div className="flex items-center justify-between">
							{previousLesson ? (
								<Link
									href={`/courses/${courseId}/lessons/${previousLesson.id}`}
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
									href={`/courses/${courseId}/lessons/${nextLesson.id}`}
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
									{lessons.map((l, index) => (
										<Link
											key={l.id}
											href={`/courses/${courseId}/lessons/${l.id}`}
											className="block"
										>
											<div
												className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors border-b border-border/50 last:border-b-0 ${
													l.id === lesson.id
														? "bg-[#A6DAFF]/10 dark:bg-[#A6DAFF]/5 border-l-2 border-l-[#A6DAFF]"
														: ""
												}`}
											>
												<div className="flex-shrink-0">
													{l.completed ? (
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
															).padStart(2, "0")}
															.
														</span>
														{l.content_type ===
														"video" ? (
															<Video className="h-3 w-3 text-muted-foreground" />
														) : (
															<FileText className="h-3 w-3 text-muted-foreground" />
														)}
													</div>
													<h4 className="font-medium text-sm leading-tight">
														{l.title}
													</h4>
												</div>
											</div>
										</Link>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
