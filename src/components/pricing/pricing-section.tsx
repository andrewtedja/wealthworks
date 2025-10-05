import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Flame } from "lucide-react";
import { GlowButtonTwo } from "../buttons/glow-button-2";

export function PricingSection() {
	const plans = [
		{
			name: "The Sentinel",
			price: "Rp 170,000",
			period: "/ bulan",
			features: [
				"Akses komunitas eksklusif via Discord",
				"Role member",
				"Artikel dan insight (Crypto & AI) Modul mingguan dari mentor",
				"Potongan ticket member untuk event",
			],
		},
		{
			name: "The Sage",
			price: "Rp 390,000",
			period: "/ 3 bulan",
			popular: true,
			features: [
				"Semua fitur The Sentinel",
				"Webinar interaktif setiap minggu",
				"Sesi Q&A langsung dengan mentor",
				"Akses rekaman dan modul eksklusif setiap minggu",
				'Role eksklusif "The Sage"',
			],
		},
		{
			name: "The Ascendant",
			price: "Rp 900,000",
			period: "/ tahun",
			features: [
				"Semua fitur The Sage",
				"1 on 1 session dengan The Founders",
				"Free entry untuk Event/Webinar",
				'Akses ke chat channel premium dengan role eksklusif "The Ascendant"',
				"Akses networking eksklusif",
				"Prioritas akses & seat untuk event offline",
			],
		},
	];

	return (
		<section
			id="pricing"
			className="relative min-h-screen  text-white py-40 px-6 bg-[#08080a] overflow-hidden"
		>
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
				<div className="w-[500px] h-[500px] bg-gradient-to-t from-indigo-500/30 via-gray-300/12 to-transparent rounded-full blur-3xl"></div>
			</div>
			{/* Grid pattern background */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
					backgroundSize: "50px 50px",
				}}
			/>

			<div className="relative max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
							Gabung Member Sekarang!
						</span>
					</h1>

					<p className="text-gray-400 text-md max-w-2xl mx-auto">
						Choose a plan that fits your goals and scale as you grow
					</p>

					{/* Membership toggle */}
					<div className="mt-8">
						<div className="inline-flex items-center bg-[#11131C] border border-gray-700/50 rounded-full px-4 py-2">
							<span className="text-gray-300 text-sm">
								Membership
							</span>
							<span className="ml-3 text-green-400 text-sm font-medium">
								SAVE 20%
							</span>
						</div>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-3 gap-7 max-w-6xl mx-auto">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`relative bg-gradient-to-tr from-[#010205] to-[#141414] border border-gray-700/20  border-t-[#747070] border-b-gray-200/10 border-l-[#363535] border-r-[#383737] backdrop-blur-sm       ${
								plan.popular ? "shadow-lg scale-105 z-10" : ""
							}`}

							// ${
							// 	plan.popular ? "ring-2 ring-yellow-300/50" : ""
							// }
						>
							{/* Featured Badge */}
							{/* {plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<Badge className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 text-xs rounded-full shadow-md">
										<Flame className="w-3 h-3 text-yellow-400" />
										Popular
									</Badge>
								</div>
							)} */}

							<CardHeader className="pb-4">
								<div className="flex items-center gap-2 mb-2">
									<div
										className={`text-lg font-medium text-gray-200`}
									>
										{plan.name}
									</div>

									{plan.popular && (
										<Badge className="inline-flex items-center gap-1 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400 rounded-full px-2 py-1 text-xs font-semibold text-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.4)] backdrop-blur-md transition-all duration-200 hover:shadow-[0_0_16px_rgba(251,191,36,0.6)] hover:border-amber-300 cursor-default ml-1">
											<Flame className="w-3 h-3 text-yellow-400 " />
											Popular
										</Badge>
									)}
								</div>

								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-gray-300">
										{plan.price}
									</span>
									<span className="text-gray-300 text-sm underline">
										{plan.period}
									</span>
								</div>
							</CardHeader>

							<CardContent className="space-y-8">
								<div className="w-full flex items-center justify-center">
									<GlowButtonTwo>
										Mulai Berlangganan
									</GlowButtonTwo>
								</div>

								<hr className="border-gray-700/30 border-dashed my-4" />

								<div className="space-y-3">
									{plan.features.map(
										(feature, featureIndex) => (
											<div
												key={featureIndex}
												className="flex items-start gap-3"
											>
												<Check className="w-4 h-4 text-sky-200 mt-0.5 flex-shrink-0" />
												<span className="text-gray-300 text-md leading-relaxed">
													{feature}
												</span>
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			{/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
				<div className="w-[400px] h-[250px] bg-gradient-to-t from-indigo-500/30 via-gray-300/12 to-transparent rounded-full blur-3xl"></div>
			</div> */}
		</section>
	);
}
