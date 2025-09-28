// import { supabase } from "../utils/supabase/client";
// import type { User, Session } from "@supabase/supabase-js";

// // ? Helper Smoke Test
// export async function smokeAuth(email: string, password: string) {
// 	await signUpNewUser(email, password);

// 	try {
// 		const session = await signInUser(email, password);
// 		return { ok: true, session };
// 	} catch (error) {
// 		return { ok: false, needsVerification: true };
// 	}
// }

// // Signup and Check Session + Verification
// export async function signUpNewUser(
// 	email: string,
// 	password: string
// ): Promise<{
// 	user: User | null;
// 	session: Session | null;
// 	isVerified: boolean;
// }> {
// 	const { data, error } = await supabase.auth.signUp({
// 		email,
// 		password,
// 		options: {
// 			emailRedirectTo: "http://localhost:3000/welcome",
// 		},
// 	});

// 	if (error) throw error;

// 	const isVerified = !!data.user?.email_confirmed_at;
// 	return { user: data.user, session: data.session, isVerified };
// }

// // Signin
// export async function signInUser(
// 	email: string,
// 	password: string
// ): Promise<Session> {
// 	const { data, error } = await supabase.auth.signInWithPassword({
// 		email,
// 		password,
// 	});
// 	if (error) throw error;
// 	return data.session;
// }

// // Signout
// export async function signOut(): Promise<void> {
// 	const { error } = await supabase.auth.signOut();
// 	if (error) throw error;
// }

// // Get User
// export async function getUser() {
// 	const { data, error } = await supabase.auth.getUser();
// 	if (error) throw new Error("[getUser] " + error.message);
// 	return data.user ?? null;
// }

// export async function getSession(): Promise<Session | null> {
// 	const { data, error } = await supabase.auth.getSession();
// 	if (error) throw new Error("[getSession] " + error.message);
// 	return data.session ?? null;
// }

// // send email to redirectTo (to reset-password)
// export async function sendPasswordResetEmail(email: string) {
// 	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
// 		redirectTo: "http://localhost:3000/auth/reset-password", // change this for production
// 	});
// 	if (error) throw error;
// 	return data;
// }

// export async function resetPassword(password: string) {
// 	const { data, error } = await supabase.auth.updateUser({ password });
// 	if (error) throw error;
// 	return data.user;
// }

// export async function resendVerification(email: string) {
// 	const { data, error } = await supabase.auth.resend({
// 		type: "signup",
// 		email,
// 		options: { emailRedirectTo: "http://localhost:3000/auth/verify" },
// 	});
// 	if (error) throw error;
// 	return data;
// }

// export async function isUserVerified(): Promise<boolean> {
// 	const { data, error } = await supabase.auth.getUser();
// 	if (error) throw error;
// 	return !!data.user?.email_confirmed_at;
// }
