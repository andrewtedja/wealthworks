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
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { dummyCourse } from "@/constants/dummy";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";

interface LessonPageProps {
	params: Promise<{ courseId: string; lessonId: string }>; // <-- params is a Promise now
}
export default function LessonPage({ params }: LessonPageProps) {
	const { courseId, lessonId } = use(params);

	// ---- FIND COURSE FROM DUMMY (array) ----
	const course = useMemo(
		() => dummyCourse.find((c) => c.id === courseId),
		[courseId]
	);
	if (!course) notFound();

	// ---- BUILD LESSONS (sorted by order_index) & MAP TO VIEW FIELDS ----
	const lessons = useMemo(() => {
		const raw = [...(course._lessons ?? [])].sort(
			(a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
		);
		return raw.map((l) => ({
			// keep raw for routing but add view-friendly fields
			raw: l,
			id: l.id,
			title: l.title,
			description: l.description ?? "",
			// map content_type -> type used by UI
			type: l.content_type === "text" ? "text" : "video", // treat 'pdf' later
			// simple content mapping for UI
			content:
				l.content_type === "video"
					? { videoUrl: l.content_url ?? "" }
					: l.content_type === "text"
					? { text: l.content_text ?? "" }
					: { videoUrl: l.content_url ?? "" }, // TODO: PDF viewer
			completed: !!l.completed,
		}));
	}, [course]);

	// ---- PICK CURRENT / PREV / NEXT ----
	const lesson = lessons.find((l) => l.id === lessonId);
	if (!lesson) notFound();

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
								href={`/courses/${course.id}`}
								className="hover:text-foreground"
							>
								{course.title}
							</Link>
							<ChevronRight className="h-4 w-4" />
							<span>{lesson.title}</span>
						</div>

						{/* Video/Text Content */}
						<Card className="p-0 border-3 border-white/70">
							<CardContent className="p-0">
								{lesson.type === "video" ? (
									<div className="relative bg-black rounded-lg overflow-hidden">
										<div className="aspect-video relative">
											{/* For YouTube: swap <img> with an <iframe> when you’re ready */}
											<iframe
												src={`${lesson.content.videoUrl}?controls=1&autoplay=1&loop=1&mute=0&VIDEO_ID&modestbranding=1&rel=0`}
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
											{lesson.content.text}
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
									{lessons.map((l, index) => (
										<Link
											key={l.id}
											href={`/courses/${course.id}/lessons/${l.id}`}
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
														{l.type === "video" ? (
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
