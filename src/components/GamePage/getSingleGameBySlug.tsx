import { GameData } from "@/app/game/[slug]/page";

export default async function getSingleGameBySlug(slug: string) {
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

	const result: GameData = (await res.json()) as GameData;

	return result;
}
