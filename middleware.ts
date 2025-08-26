import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	const { pathname } = new URL(request.url);

	const publicRoutes = ["/"];

	if (publicRoutes.includes(pathname)) return response;

	const isAuthPage = pathname.startsWith("/auth");

	const isLoggedIn = !!response.cookies.get("access_token");

	// middleware logic
	if (!isLoggedIn) {
		if (!isAuthPage) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	} else {
		if (isAuthPage) {
			return NextResponse.redirect(new URL("/courses", request.url));
		}
	}

	return response;
}

// MATCHER = route yang bisa lewat middleware
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */

		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
