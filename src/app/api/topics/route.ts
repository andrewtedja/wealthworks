import { supabase } from "@/lib/supabase";

// GET
export async function GET() {
	const { data, error } = await supabase.from("topics").select("*");
	if (error) throw new Error(error.message);
	return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
	const { data, error } = await supabase
		.from("topics")
		.insert(await req.json());
	if (error) throw new Error(error.message);
	return new Response(JSON.stringify(data));
}
