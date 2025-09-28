type Lesson = {
	id: string;
	title: string;
	description: string;
	content_type: "video" | "text";
	content_url?: string;
	content_text?: string;
	order_index: number;
	created_at: string;
	duration: number;
	completed: boolean;
	course_id?: string; // optional di frontend, wajib di DB
	course?: {
		id: string;
		title: string;
	};
};

export default Lesson;
