// utils/progress.ts
export function getCourseProgressFromDummy(c: {
	_lessons?: { completed?: boolean }[];
}) {
	const total = c._lessons?.length ?? 0;
	const done = c._lessons?.filter((l) => l.completed).length ?? 0;
	const pct = total ? Math.round((done / total) * 100) : 0;
	return { total, done, pct };
}
