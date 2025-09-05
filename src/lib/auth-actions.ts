"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/courses", "layout");
	redirect("/courses");
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const username = formData.get("username") as string;
	const phone = formData.get("phone") as string;

	// Sign up user
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) {
		console.error("SignUp error:", error.message);
		throw new Error(error.message);
	}

	if (data.user) {
		const { error: profileError } = await supabase
			.from("profiles")
			.update({
				username,
				phone,
			})
			.eq("id", data.user.id);

		if (profileError) {
			console.error("Profile error:", profileError.message);
			throw new Error(profileError.message);
		}
	}

	redirect(`/auth/verify?email=${encodeURIComponent(email)}`);
}

export async function signout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error);
		redirect("/error");
	}

	redirect("/auth");
}

export async function updateProfile(username: string, phone: string) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Not authenticated");

	const { error } = await supabase
		.from("profiles")
		.update({ username, phone })
		.eq("id", user.id);

	if (error) throw new Error(error.message);
}

export async function resetPassword(email: string) {
	const supabase = await createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${location.origin}/auth/reset-password`,
	});
	if (error) throw error;
}

export async function resendVerification(email: string) {
	const supabase = await createClient();

	const { error } = await supabase.auth.resend({
		type: "signup",
		email,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) {
		console.error("Resend error:", error.message);
		throw new Error(error.message);
	}

	return { success: true };
}
// export async function signInWithGoogle() {
// 	const supabase = await createClient();
// 	const { data, error } = await supabase.auth.signInWithOAuth({
// 		provider: "google",
// 		options: {
// 			queryParams: {
// 				access_type: "offline",
// 				prompt: "consent",
// 			},
// 		},
// 	});

// 	if (error) {
// 		console.log(error);
// 		redirect("/error");
// 	}

// 	redirect(data.url);
// }
