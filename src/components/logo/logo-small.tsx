import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LogoSmall({ size = 36 }: { size?: number }) {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Image
				src="/images/logo/logo-small.png" // or "/logo.avif", adjust as needed
				alt="WealthWorks Logo"
				width={size}
				height={size}
				priority
			/>
		</Link>
	);
}
