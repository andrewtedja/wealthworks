"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type Course from "@/types/course";

interface CourseCardProps {
	course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
	return (
		<Link href={`/courses/${course.id}`}>
			<Card className="group border-0 hover:border-[#A6DAFF]/50 hover:shadow-xl transition-all duration-200 rounded-xl overflow-hidden bg-card">
				{/* Thumbnail */}
				<CardHeader className="p-0">
					<div className="relative overflow-hidden rounded-lg">
						<Image
							src={course.thumbnail_url || "/placeholder.svg"}
							alt={course.title}
							className="w-full h-54 p-3 object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
							width={540}
							height={360}
							placeholder="blur"
							blurDataURL="/placeholder.svg"
						/>

						{/* Topic badge */}
						{course.topic && (
							<Badge
								variant="secondary"
								className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
							>
								{course.topic.name}
							</Badge>
						)}
					</div>
				</CardHeader>

				{/* Body */}
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
	);
}
