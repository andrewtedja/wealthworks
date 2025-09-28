import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = await createClient();
		await supabase.auth.exchangeCodeForSession(code);

		// sukses → redirect ke courses
		return NextResponse.redirect(new URL("/courses", requestUrl.origin));
	}

	return NextResponse.redirect(new URL("/error", requestUrl.origin));
}
