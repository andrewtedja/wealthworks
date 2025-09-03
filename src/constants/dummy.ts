// dummy-db.ts  —  mock sesuai tabel: topics, courses, lessons, lesson_progress

// 1) TOPICS
export const dummyTopics = [
	{
		id: "aaaa1111-aaaa-1111-aaaa-111111111111",
		name: "Cryptocurrency",
		description: "Topik seputar blockchain, bitcoin, dan aset kripto.",
	},
	{
		id: "bbbb2222-bbbb-2222-bbbb-222222222222",
		name: "AI",
		description: "Topik seputar machine learning dan LLM.",
	},
] as const;
export const dummyCourse = [
	{
		// === Wajib: field yang dipakai list page ===
		id: "11111111-1111-1111-1111-111111111111",
		title: "Crypto & Blockchain Basics",
		description:
			"Pelajari dasar-dasar cryptocurrency dan teknologi blockchain. Dari Bitcoin sampai siklus pasar.",
		thumbnail: "/images/thumbnails/dummy_thumbnail.avif",

		// === Topic (join dari topics) ===
		topic_id: "aaaa1111-aaaa-1111-aaaa-111111111111",
		topic: "Cryptocurrency",

		// === Meta untuk kartu ===
		lessons: 3, // jumlah lesson dalam course
		duration: "1h 03m", // opsional; boleh kamu hilangkan dari UI
		progress: 33, // (dummy) 1/3 lesson completed

		// === (Opsional) untuk halaman detail/lesson nanti ===
		_lessons: [
			{
				id: "22222222-2222-2222-2222-222222222222",
				title: "Apa itu Blockchain?",
				description: "Dasar teknologi blockchain di balik crypto.",
				content_type: "video",
				content_url: "https://www.youtube.com/embed/SSo_EIwHSd4",
				order_index: 1,
				completed: true,
			},
			{
				id: "33333333-3333-3333-3333-333333333333",
				title: "Sejarah Bitcoin",
				description: "Dari whitepaper Satoshi hingga global asset.",
				content_type: "text",
				content_text:
					"Bitcoin diperkenalkan oleh Satoshi Nakamoto pada 2008 melalui whitepaper 'Bitcoin: A Peer-to-Peer Electronic Cash System'.",
				order_index: 2,
				completed: false,
			},
			{
				id: "44444444-4444-4444-4444-444444444444",
				title: "Crypto Market Cycle",
				description:
					"Fase pasar: accumulation, markup, distribution, markdown.",
				content_type: "pdf",
				content_url: "/crypto-market-cycle.pdf",
				order_index: 3,
				completed: false,
			},
		],
	},
] as const;

// 4) LESSON PROGRESS (dummy 1 lesson completed)
export const dummyProgress = [
	{
		id: "55550000-0000-0000-0000-000000000001",
		user_id: "99999999-9999-9999-9999-999999999999",
		lesson_id: "22222222-2222-2222-2222-222222222222",
		completed: true,
		updated_at: new Date().toISOString(),
	},
] as const;
