import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const resolvedParams = await params;
	const { id } = resolvedParams;
	if (!id || id === "null") {
		return NextResponse.json(
			{ error: "Invalid courseId" },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("lessons")
		.select("*, course:courses(id, title)")
		.eq("course_id", id)
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Supabase error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
