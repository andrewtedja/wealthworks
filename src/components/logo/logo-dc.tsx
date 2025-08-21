import Image from "next/image";
import Link from "next/link";

export default function LogoDiscord({ size = 36 }: { size?: number }) {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
		>
			<Image
				src="/images/socials/discord.avif" // or "/logo.avif", adjust as needed
				alt="Discord"
				width={size}
				height={size}
				priority
			/>
		</Link>
	);
}
