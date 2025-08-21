import Footer from "@/components/_layouts/footer";
import { Navbar } from "@/components/_layouts/navbar";
import SectionDivisor from "@/components/_layouts/section-divisor";
import Benefits from "@/components/landing/benefits";
import FAQ from "@/components/landing/faq";
import { HeroSection } from "@/components/landing/hero-section";
import Introduction from "@/components/landing/introduction";
import { JoinNow } from "@/components/landing/join-now";
import SourcesSection from "@/components/landing/sources";
import { PricingSection } from "@/components/pricing/pricing-section";

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
				<SourcesSection />
				<SectionDivisor />
				<PricingSection />
				<SectionDivisor />
				<FAQ />
				<SectionDivisor />
				<JoinNow />
			</main>
			<SectionDivisor />
			<Footer companyName="WealthWorks" />
		</div>
	);
}
