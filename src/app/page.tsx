import { Navbar } from "@/components/_layouts/navbar";
import SectionDivisor from "@/components/_layouts/section-divisor";
import Benefits from "@/components/landing/benefits";
import { HeroSection } from "@/components/landing/hero-section";
import Introduction from "@/components/landing/introduction";
import { PricingSection } from "@/components/pricing/pricing-section";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col bg-[#05070E]">
			<Navbar />
			<main>
				<HeroSection />
				<SectionDivisor />
				<Introduction />
				<SectionDivisor />
				<Benefits />
				<SectionDivisor />
				<PricingSection />
			</main>
		</div>
	);
}
