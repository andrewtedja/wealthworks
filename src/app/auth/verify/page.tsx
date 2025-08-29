// app/auth/verify/page.tsx
import VerifyPage from "@/components/verify/verify-page";
import { createClient } from "@/utils/supabase/server";

export default async function VerifyPageWrapper() {
	
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <VerifyPage email={user?.email ?? ""} />;
}
