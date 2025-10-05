"use client";

import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";
import Image from "next/image";
import type Course from "@/types/course";
import type Topic from "@/types/topic";
import { Skeleton } from "../ui/skeleton";
import Loader from "../loading/loader";

export default function CoursesPage() {
	const [activeTopic, setActiveTopic] = useState<Topic | "all" | null>("all");

	// ✅ Fetch topics (cached automatically)
	const { data: topics = [], error: topicErr } = useSWR(
		"/api/topics",
		fetcher
	);

	// ✅ Fetch courses dynamically based on topic
	const topicParam =
		activeTopic && activeTopic !== "all" ? `?topic=${activeTopic.id}` : "";
	const {
		data: courses = [],
		error: courseErr,
		isLoading,
	} = useSWR(
		`/api/courses${topicParam}`,
		fetcher,
		{ revalidateOnFocus: false } // disable refetch on tab focus
	);

	const featured = courses[0];

	if (topicErr || courseErr)
		return <div className="p-8 text-red-500">Failed to load data</div>;

	const firstLoad = !courses.length && isLoading;

	if (firstLoad)
		return (
			<div className="p-8">
				<Loader />
			</div>
		);
	return (
		<div className="min-h-screen bg-background">
			<LoggedInNavbar />

			<main className="container mx-auto px-4 py-8">
				{/* Sidebar */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<aside className="lg:col-span-3">
						<nav className="sticky top-6 space-y-2">
							<div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
								Browse
							</div>
							<button
								className={`w-full text-left px-4 py-3 rounded-lg border-0 transition ${
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
									{topics.map((t: Topic) => (
										<button
											key={t.id}
											onClick={() => setActiveTopic(t)}
											className={`w-full text-left px-4 py-3 rounded-lg border-0 transition ${
												activeTopic &&
												activeTopic !== "all" &&
												activeTopic.id === t.id
													? "bg-accent border-accent text-white"
													: "border-border/50 hover:bg-accent/10"
											}`}
										>
											{t.name}
										</button>
									))}
								</div>
							</div>
						</nav>
					</aside>

					{/* Hero */}
					<section className="lg:col-span-9">
						<div className="flex items-baseline justify-between mb-4">
							<h1 className="text-2xl md:text-3xl font-bold">
								Latest Course
							</h1>
							<div className="text-sm text-muted-foreground">
								Fresh pick to kickstart your journey
							</div>
						</div>

						{featured && (
							<Link
								href={`/courses/${featured.id}`}
								className="block group"
							>
								<div className="relative overflow-hidden rounded-2xl border border-border/50 hover:border-[#A6DAFF]/50 dark:hover:border-[#A6DAFF]/30 transition-all">
									<Image
										src={
											featured.thumbnail_url ||
											"/placeholder.svg"
										}
										alt={featured.title}
										className="w-full md:h-80 lg:h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
										height={64}
										width={1000}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

									<div className="absolute top-4 right-4 flex gap-2">
										<Badge className="bg-[#A6DAFF] text-black">
											Latest
										</Badge>
										<Badge
											variant="secondary"
											className="bg-background/80"
										>
											1 Lesson
										</Badge>
									</div>

									<div className="absolute left-6 right-6 bottom-6">
										<p className="text-white/70 text-xs uppercase tracking-widest mb-1">
											{featured.topic.name}
										</p>
										<h2 className="text-white font-extrabold leading-tight text-3xl md:text-5xl">
											{featured.title}
										</h2>
									</div>
								</div>
							</Link>
						)}
					</section>
				</div>

				{/* Grid */}
				<section>
					<div className="flex items-center justify-between mb-4 mt-12">
						<h3 className="text-xl font-semibold">All Classes</h3>
						{activeTopic !== "all" && activeTopic !== null && (
							<div className="text-sm text-muted-foreground">
								Showing:{" "}
								<span className="font-medium">
									{typeof activeTopic === "string"
										? activeTopic
										: activeTopic.name}
								</span>
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
						{isLoading
							? // ✅ Skeleton loader while switching topics
							  Array.from({ length: 6 }).map((_, i) => (
									<Card
										key={i}
										className="border-0 bg-muted/10 p-4 rounded-xl shadow-sm"
									>
										<CardHeader className="p-0">
											<div className="relative overflow-hidden rounded-lg">
												<Skeleton className="w-full h-48 rounded-lg" />{" "}
												{/* thumbnail */}
											</div>
										</CardHeader>

										<CardContent className="p-6 space-y-3">
											<Skeleton className="h-5 w-3/4 rounded" />{" "}
											{/* title */}
											<Skeleton className="h-4 w-full rounded" />{" "}
											{/* desc line 1 */}
											<Skeleton className="h-4 w-5/6 rounded" />{" "}
											{/* desc line 2 */}
											<div className="flex gap-2 mt-2">
												<Skeleton className="h-3 w-6 rounded-full" />
												<Skeleton className="h-3 w-8 rounded-full" />
											</div>
										</CardContent>
									</Card>
							  ))
							: courses.map((course: Course) => (
									<Link
										key={course.id}
										href={`/courses/${course.id}`}
									>
										<Card className="group border-0 hover:border-[#A6DAFF]/50 hover:shadow-xl transition-all">
											<CardHeader className="p-0">
												<div className="relative overflow-hidden rounded-lg">
													<Image
														src={
															course.thumbnail_url ||
															"/placeholder.svg"
														}
														alt={course.title}
														className="w-full h-54 p-3 object-cover rounded-2xl"
														width={540}
														height={360}
													/>
													<Badge
														variant="secondary"
														className="absolute top-4 right-4 bg-background/80"
													>
														{course.topic.name}
													</Badge>
												</div>
											</CardHeader>

											<CardContent className="p-6">
												<CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-[#A6DAFF]">
													{course.title}
												</CardTitle>
												<p className="text-muted-foreground text-sm mb-4 line-clamp-2">
													{course.description}
												</p>

												<div className="flex items-center gap-4 text-xs text-muted-foreground">
													<BookOpen className="h-3 w-3" />
													<span>1 lesson</span>
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
