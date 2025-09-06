import { supabase } from "@/lib/supabase";

// GET /api/courses/:id
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params; // ✅ ambil dari path, bukan query

	if (!id || id === "null") {
		return new Response(JSON.stringify({ error: "Invalid courseId" }), {
			status: 400,
		});
	}

	const { data, error } = await supabase
		.from("courses")
		.select("*")
		.eq("id", id)
		.single(); // ✅ karena kita cuma ambil 1 course

	if (error) {
		console.error("Supabase error:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}

	return new Response(JSON.stringify(data));
}
