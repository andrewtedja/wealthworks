import { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/supabase-mw";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: [
		// semua path kecuali static assets & image
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4)$).*)",
	],
};
