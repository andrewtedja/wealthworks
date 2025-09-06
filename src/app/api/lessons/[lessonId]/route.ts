import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/lessons/:lessonId
export async function GET(
	request: NextRequest,
	{ params }: { params: { lessonId: string } }
) {
	const { lessonId } = await params;

	const { data, error } = await supabase
		.from("lessons")
		.select("*, course:courses(id, title)") // optional: join course
		.eq("id", lessonId)
		.single(); // since it's only one lesson

	if (error) {
		console.error("Supabase error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
