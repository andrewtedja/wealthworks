import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/_layouts/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Courses",
};

export default function CoursesPage() {
	return (
		<div className={inter.className}>
			<Navbar />
			<main className="p-4">
				<h1 className="text-3xl font-bold">Courses</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
					<Link href="/courses/nextjs">
						<Card>
							<CardHeader>
								<CardTitle>Next.js</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Learn how to build fast, scalable, and
									secure web applications with Next.js.
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
					<Link href="/courses/tailwindcss">
						<Card>
							<CardHeader>
								<CardTitle>Tailwind CSS</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Learn how to style your web applications
									with Tailwind CSS.
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
					<Link href="/courses/supabase">
						<Card>
							<CardHeader>
								<CardTitle>Supabase</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Learn how to build scalable and secure web
									applications with Supabase.
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
				</div>
			</main>
		</div>
	);
}
