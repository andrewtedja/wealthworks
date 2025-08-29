import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
	Play,
	CheckCircle,
	Circle,
	Clock,
	BookOpen,
	ChevronRight,
	FileText,
	Video,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import LoggedInNavbar from "@/components/_layouts/dashboard-navbar";

// Mock data - in real app this would come from API/database
const courseData = {
	"crypto-basics": {
		id: "crypto-basics",
		title: "Crypto & Blockchain Basic: From History to Market Mastery",
		description:
			"Master the fundamentals of cryptocurrency and blockchain technology. This comprehensive course covers everything from the history of digital currencies to advanced market analysis techniques.",
		thumbnail: "/cryptocurrency-bitcoin-golden-coins-blockchain.png",
		totalLessons: 8,
		duration: "4 hours",
		progress: 0,
		lessons: [
			{
				id: 1,
				title: "Pengenalan Blockchain Tech di Balik Cryptocurrency",
				type: "video",
				duration: "25 min",
				completed: false,
				description:
					"Understanding the fundamental technology behind cryptocurrencies",
			},
			{
				id: 2,
				title: "Sejarah Dari Bitcoin",
				type: "video",
				duration: "30 min",
				completed: false,
				description: "The complete history and evolution of Bitcoin",
			},
			{
				id: 3,
				title: "Sejarah Dari Altcoin",
				type: "video",
				duration: "28 min",
				completed: false,
				description:
					"Alternative cryptocurrencies and their development",
			},
			{
				id: 4,
				title: "Crypto Market Cycle Theory",
				type: "text",
				duration: "20 min",
				completed: false,
				description: "Understanding market cycles in cryptocurrency",
			},
			{
				id: 5,
				title: "Bedah Pilihan Investasi Terbaik",
				type: "video",
				duration: "35 min",
				completed: false,
				description: "Analyzing the best investment options in crypto",
			},
			{
				id: 6,
				title: "Kapan Waktu Membeli Crypto yang Tepat",
				type: "video",
				duration: "32 min",
				completed: false,
				description: "Timing strategies for cryptocurrency purchases",
			},
			{
				id: 7,
				title: "Altcoins & Paradox of Choices",
				type: "text",
				duration: "25 min",
				completed: false,
				description:
					"Navigating the complex world of alternative cryptocurrencies",
			},
			{
				id: 8,
				title: "Kenapa Narrative di Crypto Sengaja Diciptakan?",
				type: "video",
				duration: "40 min",
				completed: false,
				description: "Understanding market narratives and their impact",
			},
		],
	},
};

interface CourseDetailPageProps {
	params: {
		courseId: string;
	};
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
	const course = courseData[params.courseId as keyof typeof courseData];

	if (!course) {
		notFound();
	}

	const completedLessons = course.lessons.filter(
		(lesson) => lesson.completed
	).length;
	const progressPercentage = Math.round(
		(completedLessons / course.totalLessons) * 100
	);

	return (
		<div className="min-h-screen bg-background">
			<LoggedInNavbar />

			<main className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Course Info */}
					<div className="lg:col-span-2 space-y-6">
						{/* Course Header */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Link
									href="/courses"
									className="hover:text-foreground"
								>
									Courses
								</Link>
								<ChevronRight className="h-4 w-4" />
								<span>{course.title}</span>
							</div>

							<div className="space-y-4">
								<div className="relative aspect-video overflow-hidden rounded-lg border-1 border-gray-200/10">
									<img
										src={
											course.thumbnail ||
											"/placeholder.svg"
										}
										alt={course.title}
										className="w-full h-64 object-cover"
									/>
									<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
										<Button
											size="lg"
											className="bg-[#A6DAFF] hover:bg-[#A6DAFF]/90 text-black"
										>
											<Play className="h-5 w-5 mr-2" />
											Start Learning
										</Button>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<BookOpen className="h-4 w-4" />
												<span>
													{course.totalLessons}{" "}
													lessons
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												<span>{course.duration}</span>
											</div>
										</div>
									</div>

									<h1 className="text-3xl font-bold text-foreground mt-5">
										{course.title}
									</h1>

									<p className="text-muted-foreground leading-relaxed">
										{course.description}
									</p>
								</div>
							</div>
						</div>

						{/* Progress Overview */}
						<Card className="border-1 border-gray-200/50">
							<CardHeader>
								<CardTitle className="text-lg">
									Your Progress
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										{completedLessons} of{" "}
										{course.totalLessons} lessons completed
									</span>
									<span className="font-medium">
										{progressPercentage}%
									</span>
								</div>
								<Progress
									value={progressPercentage}
									className="h-2"
								/>
							</CardContent>
						</Card>
					</div>

					{/* Lessons Sidebar */}
					<div className="space-y-4">
						<Card className="border-1 border-gray-200/10">
							<CardHeader>
								<CardTitle className="text-lg">
									Course Curriculum
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0">
								<div className="space-y-1">
									{course.lessons.map((lesson, index) => (
										<Link
											key={lesson.id}
											href={`/courses/${course.id}/lessons/${lesson.id}`}
											className="block"
										>
											<div className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors border-b border-border/50 last:border-b-0">
												<div className="flex-shrink-0">
													{lesson.completed ? (
														<CheckCircle className="h-5 w-5 text-green-500" />
													) : (
														<Circle className="h-5 w-5 text-muted-foreground" />
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
														{lesson.type ===
														"video" ? (
															<Video className="h-3 w-3 text-muted-foreground" />
														) : (
															<FileText className="h-3 w-3 text-muted-foreground" />
														)}
													</div>
													<h4 className="font-medium text-sm leading-tight mb-1">
														{lesson.title}
													</h4>
													<p className="text-xs text-muted-foreground line-clamp-2">
														{lesson.description}
													</p>
													<div className="flex items-center gap-2 mt-2">
														<Clock className="h-3 w-3 text-muted-foreground" />
														<span className="text-xs text-muted-foreground">
															{lesson.duration}
														</span>
													</div>
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
