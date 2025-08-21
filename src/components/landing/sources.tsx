import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function SourcesSection() {
	const companies = [
		{
			id: 1,
			name: "Bloomberg",
			category: "Media Company",
			logo: "/images/sources/logo-bloomberg.png",
			description:
				"The Bloomberg Terminal is a powerful computer software system that provides real-time financial data analysis, news, and a trading platform.",
		},
		{
			id: 2,
			name: "CryptoBanana.id",
			category: "Crypto Course",
			logo: "/images/sources/logo-cryptobanana.png",
			description:
				"CryptoBanana.id is an online course that simplifies cryptocurrency and blockchain, helping you easily get started with digital money.",
		},
		{
			id: 3,
			name: "SolusiRemaja.AI",
			category: "AI Course",
			logo: "/images/sources/logo-solusiremajaai.png",
			description:
				"SolusiRemaja.AI teaches individuals to learn and apply AI through interactive lessons, helping them use AI in real-world scenarios.",
		},
		{
			id: 4,
			name: "J.P.Morgan",
			category: "Investment Banking Company",
			logo: "/images/sources/logo-jpmorgan.png",
			description:
				"JPMorgan Chase & Co. is an American multinational finance corporation headquartered in New York City and incorporated in Delaware.",
		},
		{
			id: 5,
			name: "MicroStrategy",
			category: "Business Intelligence company",
			logo: "/images/sources/logo-strategy.png",
			description:
				"MicroStrategy Incorporated, doing business as Strategy, is an American development company that provides business intelligence.",
		},
		{
			id: 6,
			name: "LearnCrypto",
			category: "Crypto Course",
			logo: "/images/sources/logo-learncrypto.png",
			description:
				"LearnCrypto is an online course that helps you understand crypto and blockchain, making it simple to begin your journey into digital currency.",
		},
	];

	return (
		<div className="py-12 bg-[#05070E] relative ">
			<div className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
						Utilizing data from
					</h1>
					<p className="text-gray-500 text-md">
						Rangkuman semua informasi yang kau butuhkan
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{companies.map((company) => (
						<Card
							key={company.id}
							className="relative bg-gradient-to-br from-white/[0.08] via-gray-900/40 to-black/20 border border-white/10 backdrop-blur-md shadow-2xl hover:from-white/[0.12] hover:via-gray-800/50 hover:to-black/30 hover:border-white/20 hover:shadow-3xl transition-all duration-500 ease-out p-0 overflow-hidden gap-3"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

							<div className="relative flex items-start gap-4 p-6 pb-4">
								<div className="flex-shrink-0">
									<Image
										src={company.logo || "/placeholder.svg"}
										alt={`${company.name} logo`}
										className="rounded-md bg-gradient-to-b from-[#0f1014] to-[#000000] p-1 border border-gray-700/20  border-t-[#505050] border-b-gray-200/5 border-l-[#333232] border-r-[#3a3939]"
										width={60}
										height={60}
									/>
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="text-gray-300 font-medium text-lg mb-1">
										{company.name}
									</h3>
									<p className="text-gray-400 text-sm">
										{company.category}
									</p>
								</div>
							</div>

							<div className="relative mx-6">
								<div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
								<div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"></div>
							</div>

							<div className="p-6 pt-4 space-y-4">
								<p className="text-gray-400 text-sm leading-6">
									{company.description
										.split("\n")
										.map((paragraph, index) => (
											<span key={index}>
												{paragraph}
												<br className="my-2" />
											</span>
										))}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
			{/* <div className="bg-[#05070E] flex justify-center items-center max-w-6xl mx-auto">
				<LogoSlider />
			</div> */}
		</div>
	);
}
