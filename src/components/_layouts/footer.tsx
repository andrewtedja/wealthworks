import type React from "react";
import {
	Instagram,
	Mail,
	MessageCircle,
	MessageSquare,
	Twitter,
} from "lucide-react";
import LogoFull from "../logo/logo-full";

interface FooterProps {
	companyName?: string;
	description?: string;
	email?: string;
	whatsapp?: string;
	socialLinks?: {
		name: string;
		href: string;
		icon: React.ReactNode;
	}[];
}

type SocialLinkProps = {
	name: string;
	href: string;
	icon: React.ReactNode;
};

const defaultSocialLinks: SocialLinkProps[] = [
	{
		name: "Instagram",
		href: "https://instagram.com/yourbusiness",
		icon: <Instagram className="w-5 h-5" />,
	},
	{
		name: "Discord",
		href: "https://discord.gg/yourbusiness",
		icon: <MessageSquare className="w-5 h-5" />,
	},
	{
		name: "Twitter",
		href: "https://twitter.com/yourbusiness",
		icon: <Twitter className="w-5 h-5" />,
	},
];

export default function Footer({
	companyName = "Your Business",
	description = "",
	email = "WealthWorks.management@gmail.com",
	whatsapp = "+6281234567890",
	socialLinks: propSocialLinks,
}: FooterProps) {
	const currentYear = new Date().getFullYear();
	const socialLinks = propSocialLinks ?? defaultSocialLinks;

	return (
		<footer className="bg-black text-white">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
					{/* Brand Section - Left */}
					<div className="space-y-4">
						<div className="flex items-center space-x-3">
							<LogoFull size={140} />
							{/* <span className="text-xl font-semibold">
								{companyName}
							</span> */}
						</div>
						<p className="text-gray-400 text-sm leading-relaxed">
							{description}
						</p>
					</div>

					{/* Social Media - Center */}
					{/* <div className="space-y-4 md:text-center">
						<h3 className="text-lg font-medium">Social Media</h3>
						{socialLinks.length > 0 && (
							<div className="flex justify-center md:justify-center space-x-4">
								{socialLinks.map((social) => (
									<a
										key={social.name}
										href={social.href}
										className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
										aria-label={social.name}
									>
										{social.icon}
									</a>
								))}
							</div>
						)}
					</div> */}

					{/* Contact - Right */}
					<div className="space-y-4 md:text-right">
						<h3 className="text-lg font-medium">Contact</h3>
						<div className="space-y-3">
							<a
								href={`mailto:${email}`}
								className="flex items-center md:justify-end space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
							>
								<Mail className="w-4 h-4 order-2 md:order-1" />
								<span className="order-1 md:order-2">
									{email}
								</span>
							</a>
							<a
								href={`https://wa.me/${whatsapp.replace(
									/\s/g,
									""
								)}`}
								className="flex items-center md:justify-end space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle className="w-4 h-4 order-2 md:order-1" />
								<span className="order-1 md:order-2">
									{whatsapp}
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-500 text-sm">
						{companyName} ©{currentYear} All rights reserved
					</p>
					<a
						href="#"
						className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
}
