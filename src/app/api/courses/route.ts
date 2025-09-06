import { supabase } from "@/lib/supabase";
import { NextResponse, NextRequest } from "next/server";

// GET /api/courses
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const topic = searchParams.get("topic");

	let query = supabase.from("courses").select("*, topic:topic_id(name)");

	if (topic && topic !== "all") {
		query = query.eq("topic_id", topic.toString());
	}

	const { data, error } = await query;

	if (error) return new NextResponse(error.message, { status: 500 });

	return NextResponse.json(data);
}
