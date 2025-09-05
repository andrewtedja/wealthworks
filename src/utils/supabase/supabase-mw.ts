// utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function isPublic(pathname: string) {
	return pathname === "/" || pathname.startsWith("/auth");
}

export async function updateSession(request: NextRequest) {
	console.log("Middleware dijalankan:", request.nextUrl.pathname);

	const supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					// Don't create a new response here, just set cookies on existing one
					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		}
	);

	// This call is important - it refreshes the session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.log("User found:", !!user);

	// Protected routes - redirect to auth if no user
	if (!user && !isPublic(request.nextUrl.pathname)) {
		console.log("Redirecting to /auth");
		console.log(request.nextUrl.pathname);

		const url = request.nextUrl.clone();
		url.pathname = "/auth";
		return NextResponse.redirect(url);
	}

	// If user exists and trying to access auth page, redirect to dashboard/home
	if (user && request.nextUrl.pathname === "/auth") {
		console.log("User logged in, redirecting from auth to home");
		const url = request.nextUrl.clone();
		url.pathname = "/courses"; // or wherever you want logged-in users to go
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
