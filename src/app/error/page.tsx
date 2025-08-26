import { Navbar } from "@/components/_layouts/navbar";

const ErrorPage = () => {
	return (
		<div className="bg-[#05070C]">
			<Navbar />
			<main className="flex text-white flex-col items-center justify-center w-full h-screen">
				<h1 className="text-6xl font-bold">Error</h1>
				<p className="text-xl">Something went wrong.</p>
			</main>
		</div>
	);
};

export default ErrorPage;
