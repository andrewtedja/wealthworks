"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
	Play,
	CheckCircle,
	Circle,
	BookOpen,
	ChevronRight,
	FileText,
} from "lucide-react";
import Link from "next/link";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

import type Lesson from "@/types/lesson";
import type Course from "@/types/course";

interface CourseDetailPageProps {
	params: Promise<{ courseId: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
	const [courseId, setCourseId] = useState<string>("");
	const [course, setCourse] = useState<Course | null>(null);
	const [lessons, setLessons] = useState<Lesson[]>([]);

	// Resolve params first
	useEffect(() => {
		const resolveParams = async () => {
			const resolvedParams = await params;
			setCourseId(resolvedParams.courseId);
		};
		resolveParams();
	}, [params]);

	// LOAD COURSE
	useEffect(() => {
		if (!courseId) return;
		const fetchCourse = async () => {
			const res = await fetch(`/api/courses/${courseId}`);
			const data = await res.json();
			setCourse(data);
		};
		fetchCourse();
	}, [courseId]);

	// LOAD LESSONS
	useEffect(() => {
		if (!courseId) return;
		const fetchLessons = async () => {
			const res = await fetch(`/api/courses/${courseId}/lessons`);
			const data = await res.json();
			setLessons(data);
		};
		fetchLessons();
	}, [courseId]);

	// Show loading while params are being resolved
	if (!courseId) {
		return <div className="p-8">Loading...</div>;
	}

	const sortedLessons = [...lessons].sort(
		(a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
	);

	const totalLessons = sortedLessons.length;

	const completed = sortedLessons.filter((l) => l.completed).length;

	const pct = totalLessons ? Math.round((completed / totalLessons) * 100) : 0;
	const firstIncomplete =
		sortedLessons.find((l) => !l.completed) ?? sortedLessons[0];

	return (
		<div className="min-h-screen bg-background">
			<LoggedInNavbar />

			<main className="container mx-auto px-4 py-8">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* LEFT: Enhanced Curriculum Section */}
					<section className="lg:col-span-2">
						<Card className="border-0  shadow-lg   backdrop-blur-sm gap-0">
							<CardHeader className="border-b border-border/50">
								<div className="flex items-center justify-between">
									<CardTitle className="text-3xl font-semibold text-foreground">
										Course Curriculum
									</CardTitle>
									<Badge
										variant="secondary"
										className="text-lg"
									>
										{totalLessons} Lessons
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<div className="">
									{sortedLessons.map((lesson, index) => (
										<div
											key={lesson.id}
											className={`
												group relative  border transition-all duration-200 ease-in-out
												${
													lesson.completed
														? "bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/50 dark:border-green-800 dark:hover:bg-green-900/40"
														: "bg-card border-border hover:bg-muted/50 hover:border-border/80"
												}
												hover:shadow-md  cursor-pointer
											`}
										>
											<div className="flex items-center justify-between p-4">
												<div className="flex items-center gap-4 min-w-0 flex-1">
													<div className="flex items-center gap-3">
														{lesson.completed ? (
															<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
														) : (
															<Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
														)}
														<span
															className={`
															text-sm font-medium w-8 text-center
															${
																lesson.completed
																	? "text-green-700 dark:text-green-300"
																	: "text-muted-foreground"
															}
														`}
														>
															{String(
																index + 1
															).padStart(2, "0")}
															.
														</span>
													</div>

													<div className="flex-shrink-0">
														{lesson.content_type ===
														"video" ? (
															<Play
																className={`h-4 w-4 ${
																	lesson.completed
																		? "text-green-600 dark:text-green-400"
																		: "text-muted-foreground group-hover:text-primary"
																}`}
															/>
														) : (
															<FileText
																className={`h-4 w-4 ${
																	lesson.completed
																		? "text-green-600 dark:text-green-400"
																		: "text-muted-foreground group-hover:text-primary"
																}`}
															/>
														)}
													</div>

													<div className="min-w-0 flex-1">
														<h3
															className={`
															font-medium text-xl leading-tight mb-1
															${
																lesson.completed
																	? "text-green-800 dark:text-green-200"
																	: "text-foreground group-hover:text-primary"
															}
														`}
														>
															{lesson.title}
														</h3>
													</div>
												</div>

												<Link
													href={`/courses/${courseId}/lessons/${lesson.id}`}
													className="flex-shrink-0"
												>
													<Button
														size="sm"
														className={`
															min-w-20 transition-all duration-200 py-6
															${
																lesson.completed
																	? "bg-green-900/20 text-green-800 hover:bg-green-900/30 dark:bg-green-500/20 dark:text-green-300 dark:hover:bg-green-300/30"
																	: "bg-primary hover:bg-primary/90 group-hover:shadow-md"
															}
														`}
													>
														{lesson.completed
															? "Review"
															: "Start"}
													</Button>
												</Link>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</section>

					{/* RIGHT: Enhanced Progress + Overview */}
					<aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
						<Card className="overflow-hidden border-0 shadow-lg  backdrop-blur-sm ">
							{course?.thumbnail_url && (
								<div className="relative overflow-hidden">
									<Image
										src={
											course.thumbnail_url ||
											"/placeholder.svg"
										}
										alt={course.title}
										width={320}
										height={120}
										className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>
							)}
							<CardContent className="pt-6 space-y-6">
								<h1 className="text-xl font-bold leading-tight text-balance">
									{course?.title}
								</h1>

								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<BookOpen className="h-4 w-4" />
									<span className="font-medium">
										{totalLessons} lessons
									</span>
								</div>

								<div className="space-y-3">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground font-medium">
											Progress
										</span>
										<span className="font-bold text-primary">
											{completed}/{totalLessons} completed
										</span>
									</div>
									<div className="space-y-2">
										<Progress
											value={pct}
											className="h-3 bg-muted"
										/>
										<p className="text-center text-lg font-bold text-primary">
											{pct}% Complete
										</p>
									</div>
								</div>

								{firstIncomplete && course && (
									<Link
										href={`/courses/${course?.id}/lessons/${firstIncomplete.id}`}
									>
										<Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
											Continue Learning
											<ChevronRight className="ml-2 h-5 w-5" />
										</Button>
									</Link>
								)}
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
							<CardHeader className="pb-4">
								<CardTitle className="text-base font-semibold">
									About This Course
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-muted-foreground leading-relaxed">
								{course?.description}
							</CardContent>
						</Card>
					</aside>
				</div>
			</main>
		</div>
	);
}
