import {
	Users,
	Rocket,
	FileText,
	Fingerprint,
	CheckCircle,
	Sparkles,
	ShieldCheck,
} from "lucide-react";

const benefits = [
	{
		title: "Komunitas 2 Arah",
		description:
			"Connect effortlessly with real-time syncing and shared workspaces.",
		icons: [Users, CheckCircle],
	},
	{
		title: "Sumber Terpercaya",
		description:
			"Eliminate repetitive tasks with smart automation solutions.",
		icons: [Rocket, FileText],
	},
	{
		title: "Keamanan Data",
		description:
			"Enterprise-grade security ensures your data stays safe and accessible.",
		icons: [Fingerprint, ShieldCheck],
	},
];

export default function Benefits() {
	return (
		<section
			id="benefits"
			className="relative pt-20 pb-24 px-6 bg-[#05070C]"
		>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 ">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 mb-4 border-white/5 border-1 rounded-xl px-3 py-1.5">
							<div className="w-4 h-4 bg-black rounded-full flex items-center justify-center ">
								<Sparkles
									className="text-white/80"
									fill="white"
								/>
							</div>
							<span className="text-white/80 text-xs font-light tracking-wide">
								BENEFITS
							</span>
						</div>
					</div>

					<h2 className="text-4xl md:text-5xl text-white font-medium mb-4">
						Kenapa pilih WealthWorks?
					</h2>
					<p className="text-gray-400 text-lg">
						Everything you need to collaborate, create in one place
					</p>
				</div>

				{/* Benefits Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit) => (
						<div className="group relative" key={benefit.title}>
							<div className="bg-gradient-to-b from-[#05070C] to-[#05070C] rounded-2xl p-8 border border-gray-700/20  border-t-[#505050] border-b-gray-200/5 border-l-[#242323] border-r-[#252525]">
								<div className="flex flex-col items-center justify-center p-12 bg-gradient-to-tr from-[#05070C] to-[#12141f] rounded-md border-1 border-t-[#303031] border-b-0 border-l-[#161616] border-r-[#191818] mb-7 ">
									<div className="bg-[#14161F] rounded-md p-4 transition-transform duration-400 cursor-pointer group-hover:scale-115 mx-auto  border border-t-gray-200/20 border-r-gray-400/10 border-l-gray-400/10">
										<div className="flex items-center">
											{benefit.icons.map(
												(Icon, iconIdx) => (
													<div
														key={iconIdx}
														className="flex items-center "
													>
														{iconIdx > 0 && (
															<div
																className="w-px h-8 bg-gray-600 mx-3"
																key={`divider-${iconIdx}`}
															></div>
														)}
														<Icon className="w-8 h-8 text-gray-400 group-hover:text-gray-200 transform-color duration-400" />
													</div>
												)
											)}
										</div>
									</div>
								</div>
								<div className="text-center">
									<h3 className="text-xl text-white font-medium mb-4">
										{benefit.title}
									</h3>
									<p className="text-gray-400 leading-relaxed text-sm">
										{benefit.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
				<div className="w-[500px] h-[350px] bg-gradient-to-t from-indigo-500/30 via-gray-300/12 to-transparent rounded-full blur-3xl"></div>
			</div>
		</section>
	);
}
