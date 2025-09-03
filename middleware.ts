import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	const { pathname } = new URL(request.url);

	const publicRoutes = ["/", "/auth/login", "/auth/register"];
	const isPublic =
		publicRoutes.includes(pathname) || pathname.startsWith("/auth");

	if (isPublic) {
		// Biar user yang sudah login gak buka halaman auth lagi:
		const isLoggedInNow =
			!!request.cookies.get("access_token") ||
			!!request.cookies.get("sb-access-token");
		if (isLoggedInNow && pathname.startsWith("/auth")) {
			return NextResponse.redirect(new URL("/courses", request.url));
		}
		return response; // lewat
	}

	// 2) Private routes — cek login dari REQUEST cookies (bukan response)
	const isLoggedIn =
		!!request.cookies.get("access_token") ||
		!!request.cookies.get("sb-access-token");

	if (!isLoggedIn) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	// 3) Default: allow
	return response;
}

// Pastikan matcher-nya kena semua route yang kamu mau proteksi
export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
