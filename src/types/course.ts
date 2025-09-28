import type Topic from "./topic";

type Course = {
	id: string;
	title: string;
	description: string;
	thumbnail_url: string;
	created_at: string;
	topic_id: string;
	topic: Topic;
};

export default Course;
