import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "(Dev) WealthWorks",
	description: "Fortune Favors The Bold.",
	icons: {
		icon: [
			{
				url: "/icons/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/icons/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{ url: "/icons/favicon.ico" },
		],
		apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
		other: [
			{
				rel: "icon",
				url: "/icons/android-chrome-192x192.png",
				sizes: "192x192",
			},
		],
	},
	// openGraph: {
	// 	type: "website",
	// 	url: "https://duapermatamulia.co.id",
	// 	siteName: "Dua Permata Mulia | Authorized AV Distributor | Situs Resmi",
	// 	title: "Dua Permata Mulia | Authorized AV Distributor | Situs Resmi",
	// 	description: `We provide high-performance video conferencing visualizers, AI hardware, and smart systems for tomorrow's industries — specializing in education technology and visual collaboration solutions.`,
	// 	images: [
	// 		{ url: "/og/default-og.png", width: 1200, height: 630, alt: "OG" },
	// 	],
	// 	locale: "en_US",
	// },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
