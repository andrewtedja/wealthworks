"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play } from "lucide-react";
import Link from "next/link";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";
import Image from "next/image";
import { dummyCourse, dummyTopics } from "@/constants/dummy";

// Mock data - in real app this would come from API/database
function getCourseProgressFromDummy(c: {
	readonly _lessons?: readonly { readonly completed?: boolean }[];
}) {
	const total = c._lessons?.length ?? 0;
	const done = c._lessons?.filter((l) => l.completed).length ?? 0;
	const pct = total ? Math.round((done / total) * 100) : 0;
	return { total, pct };
}

const courses = dummyCourse.map((c) => {
	const { pct, total } = getCourseProgressFromDummy(c);
	return { ...c, progress: pct, lessons: total };
});

const topics = dummyTopics.map((topic) => topic.name) as readonly string[];

type TopicKey = "all" | string;

export default function CoursesPage() {
	// Topic-only filtering
	const [activeTopic, setActiveTopic] = useState<TopicKey>("all");

	// Latest = first course
	const featured = courses[0];

	const visibleCourses = useMemo(() => {
		if (activeTopic === "all") return courses;
		return courses.filter((c) => c.topic === activeTopic);
	}, [activeTopic]);

	return (
		<div className="min-h-screen bg-background">
			<LoggedInNavbar />

			<main className="container mx-auto px-4 py-8">
				{/* Sidebar (kept), but only All Classes + Topics */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<aside className="lg:col-span-3">
						<nav className="sticky top-6 space-y-2">
							<div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
								Browse
							</div>
							<button
								className={`w-full text-left px-4 py-3 rounded-lg border-0 transition  ${
									activeTopic === "all"
										? "bg-accent border-accent text-white"
										: "border-border/50 hover:bg-accent/50"
								}`}
								onClick={() => setActiveTopic("all")}
							>
								All Classes
							</button>

							<div className="pt-4">
								<div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
									Topics
								</div>
								<div className="space-y-2">
									{topics.map((t) => (
										<button
											key={t}
											onClick={() => setActiveTopic(t)}
											className={`w-full text-left px-4 py-3 rounded-lg border-0 transition ${
												activeTopic === t
													? "bg-accent border-accent"
													: "border-border/50 hover:bg-accent/50"
											}`}
										>
											{t}
										</button>
									))}
								</div>
							</div>
						</nav>
					</aside>

					{/* Hero (latest course = courses[0]) */}
					<section className="lg:col-span-9">
						<div className="flex items-baseline justify-between mb-4">
							<h1 className="text-2xl md:text-3xl font-bold">
								Latest Course
							</h1>
							<div className="text-sm text-muted-foreground">
								Fresh pick to kickstart your journey
							</div>
						</div>

						<Link
							href={`/courses/${featured.id}`}
							className="block group"
						>
							<div className="relative overflow-hidden rounded-2xl border border-border/50 hover:border-[#A6DAFF]/50 dark:hover:border-[#A6DAFF]/30 transition-all">
								<Image
									src={
										featured.thumbnail || "/placeholder.svg"
									}
									alt={featured.title}
									className="w-full  md:h-80 lg:h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
									height={64}
									width={1000}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

								{/* Top-right badges (no isNew flag; mark as Latest) */}
								<div className="absolute top-4 right-4 flex gap-2">
									<Badge className="bg-[#A6DAFF] dark:bg-gray-900 dark:text-white text-black hover:bg-[#A6DAFF]/90">
										Latest
									</Badge>
									<Badge
										variant="secondary"
										className="bg-background/80 backdrop-blur-sm"
									>
										{featured.lessons} Lessons
									</Badge>
								</div>

								<div className="absolute left-6 right-6 bottom-6">
									<p className="text-white/70 text-xs md:text-sm uppercase tracking-widest mb-1">
										{featured.topic}
									</p>
									<h2 className="text-white font-extrabold leading-tight text-3xl md:text-5xl tracking-tight">
										<span className="block md:mt-2">
											{featured.title}
										</span>
									</h2>
								</div>
							</div>
						</Link>
					</section>
				</div>

				{/* Topic chips */}
				{/* <section className="mt-10 mb-6">
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setActiveTopic("all")}
							className={`px-3 py-1.5 text-sm rounded-full border transition ${
								activeTopic === "all"
									? "bg-accent border-accent"
									: "border-border/50 hover:bg-accent/50"
							}`}
						>
							All Topics
						</button>
						{topics.map((t) => (
							<button
								key={t}
								onClick={() => setActiveTopic(t)}
								className={`px-3 py-1.5 text-sm rounded-full border transition ${
									activeTopic === t
										? "bg-accent border-accent"
										: "border-border/50 hover:bg-accent/50"
								}`}
							>
								{t}
							</button>
						))}
					</div>
				</section> */}

				{/* Grid */}
				<section>
					<div className="flex items-center justify-between mb-4 mt-12">
						<h3 className="text-xl font-semibold">All Classes</h3>
						{activeTopic !== "all" && (
							<div className="text-sm text-muted-foreground">
								Showing:{" "}
								<span className="font-medium">
									{activeTopic}
								</span>
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
						{visibleCourses.map((course) => (
							<Link
								key={course.id}
								href={`/courses/${course.id}`}
							>
								<Card className="group  transition-all duration-300 cursor-pointer border-0 border-border/50 hover:border-[#A6DAFF]/50 dark:hover:border-[#A6DAFF]/30 hover:shadow-xl  lg:h-128 py-0 gap-0 hover:scale-103">
									<CardHeader className="p-0">
										<div className="relative overflow-hidden rounded-lg">
											<Image
												src={
													course.thumbnail ||
													"/placeholder.svg"
												}
												alt={course.title}
												className="w-full h-54 p-3 object-cover rounded-2xl duration-200"
												width={540}
												height={360}
												placeholder="blur"
												blurDataURL="/placeholder.svg"
											/>
											<Badge
												variant="secondary"
												className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
											>
												{course.topic}
											</Badge>
										</div>
									</CardHeader>

									<CardContent className="p-6">
										<CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-[#A6DAFF] dark:group-hover:text-[#A6DAFF] transition-colors">
											{course.title}
										</CardTitle>

										<p className="text-muted-foreground text-sm mb-4 line-clamp-2">
											{course.description}
										</p>

										{/* Meta */}
										<div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
											<div className="flex items-center gap-1">
												<BookOpen className="h-3 w-3" />
												<span>
													{course.lessons} lessons
												</span>
											</div>
										</div>

										{/* Progress */}
										<div className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="text-muted-foreground">
													Progress
												</span>
												<span className="font-medium">
													{course.progress}%
												</span>
											</div>
											<Progress
												value={course.progress}
												className="h-2"
											/>
											{course.progress === 0 ? (
												<div className="flex items-center gap-1 text-xs text-[#A6DAFF] dark:text-[#A6DAFF] font-medium">
													<Play className="h-3 w-3" />
													Start Course
												</div>
											) : (
												<div className="text-xs text-muted-foreground">
													Continue learning
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
