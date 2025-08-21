"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, ArrowUpRight } from "lucide-react";

const faqData = [
	{
		question: "Apa itu WealthWorks?",
		answer: "WealthWorks adalah platform yang membantu kamu mengelola keuangan pribadi dan komunitas untuk networking",
	},
	{
		question: "Apakah situs ini gratis?",
		answer: "Kami menyediakan versi dasar yang gratis untuk digunakan dengan materi terbatas. Ada juga fitur premium dengan lebih banyak saran personal dan alat bantu yang lebih canggih, yang bisa diakses dengan langganan bulanan atau bahkan seumur hidup (lifetime).",
	},
	{
		question: "Kenapa harus gabung WealthWorks",
		answer: `Bergabung dengan komunitas di Wealthworksitu bikin kita nggak merasa sendirian dalam mengelola keuangan. Di sini, kamu bisa ngobrol bareng orang-orang yang punya tujuan yang sama, saling berbagi pengalaman, dan tentu aja saling menyemangati. Ada banyak orang dengan latar belakang yang berbeda, jadi kamu bisa dapet banyak perspektif baru. \n\n Selain itu, komunitas ini juga jadi tempat yang oke buat belajar lebih dalam, karena banyak yang siap berbagi tips dan trik tentang cara atur keuangan, investasi, atau hal-hal lain yang terkait. Kalau ada yang bingung atau butuh bimbingan, pasti ada yang siap bantu, jadi kamu nggak perlu merasa bingung sendirian. Ini jadi semacam “support system” yang bikin perjalanan keuangan kamu lebih ringan dan seru!`,
	},
	{
		question: "Apakah data saya aman di WealthWorks?",
		answer: "Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi tingkat bank dan standar keamanan internasional untuk melindungi informasi Anda.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index);
	};

	return (
		<section className="relative py-32 bg-[#05070C] flex items-center justify-center p-6">
			<div className="max-w-6xl w-full">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-2 mb-4">
						<div className="w-6 h-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
							<div className="w-2 h-2 bg-white/60 rounded-full"></div>
						</div>
						<span className="text-white/70 text-sm font-medium tracking-wider uppercase">
							FAQ&apos;S
						</span>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
						Kita Punya Jawabannya!
					</h1>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-8 items-start">
					{/* Left Side - Contact Box */}
					<div className="relative">
						<div className="relative p-8 rounded-2xl bg-gradient-to-tr from-[#05070C] to-[#171b1f] backdrop-blur-xl border border-white/[0.15] shadow-2xl">
							{/* Gradient overlay */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.05] pointer-events-none"></div>

							<div className="relative z-10 text-center">
								{/* Icon */}
								<div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.03] backdrop-blur-sm border border-white/[0.2] flex items-center justify-center shadow-lg">
									<HelpCircle className="w-8 h-8 text-white/80" />
								</div>

								{/* Content */}
								<h3 className="text-2xl font-bold text-white mb-3">
									Masih ada Pertanyaan?
								</h3>
								<p className="text-white/60 mb-8 leading-relaxed">
									Ada pertanyaan? Hubungi kami sekarang!
								</p>

								{/* Button */}
								<button className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-white/[0.12] via-white/[0.08] to-white/[0.04] backdrop-blur-sm border border-white/[0.2] text-white font-medium transition-all duration-300 hover:from-white/[0.18] hover:via-white/[0.12] hover:to-white/[0.06] hover:border-white/[0.3] hover:shadow-lg hover:shadow-white/[0.1] flex items-center gap-2 mx-auto">
									<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									Hubungi Kami
								</button>
							</div>
						</div>
					</div>

					{/* Right Side - FAQ List */}
					<div className="space-y-4">
						{faqData.map((faq, index) => (
							<div
								key={index}
								className="relative rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/[0.15] overflow-hidden shadow-xl"
							>
								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.03] pointer-events-none"></div>

								<button
									onClick={() => toggleFAQ(index)}
									className="relative z-10 w-full p-6 text-left flex items-center justify-between group transition-all duration-300 hover:bg-white/[0.02]"
								>
									<span className="text-white/90 font-medium text-lg pr-4">
										{faq.question}
									</span>
									<div className="flex-shrink-0 w-6 h-6 text-white/60 transition-transform duration-300">
										{openIndex === index ? (
											<ChevronUp className="w-6 h-6" />
										) : (
											<ChevronDown className="w-6 h-6" />
										)}
									</div>
								</button>

								{/* Answer */}
								<div
									className={`relative z-10 overflow-hidden transition-all duration-300 ease-in-out ${
										openIndex === index
											? "max-h-100 opacity-100"
											: "max-h-0 opacity-0"
									}`}
								>
									{/* Divider */}
									<div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"></div>

									<div className="p-6 pt-4">
										<p className="text-white/70 leading-relaxed whitespace-pre-line">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
