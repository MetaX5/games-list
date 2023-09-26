import { gameData } from "@/app/game/[slug]/page";

export default async function SingleGameBySlug(
	slug: string,
): Promise<gameData> {
	const res = await fetch(
		`https://api.rawg.io/api/games/${slug}?key=${process.env.RAWG_API_KEY}`,
		{ next: { revalidate: 3600 } },
	);

	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	// Recommendation: handle errors
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		console.error("Failed to fetch data");
	}

	const result: gameData = (await res.json()) as gameData;

	return result;
}
