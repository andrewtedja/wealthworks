import { supabase } from "@/lib/supabase";

// GET
export async function GET() {
	const { data, error } = await supabase.from("topics").select("*");
	if (error) throw new Error(error.message);
	return new Response(JSON.stringify(data), {
		headers: {
			"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
		},
	});
}

export async function POST(req: Request) {
	const { data, error } = await supabase
		.from("topics")
		.insert(await req.json());
	if (error) throw new Error(error.message);
	return new Response(JSON.stringify(data));
}
