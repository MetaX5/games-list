import { screenshots } from "./GameGallery";

export default async function getGameScreenshotsBySlug(
	slug: string,
	apiKey: string,
) {
	const res = await fetch(
		`https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`,
		{ next: { revalidate: 3600 } },
	);

	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	// Recommendation: handle errors
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		console.error("Failed to fetch data");
	}

	const result: screenshots = (await res.json()) as screenshots;

	return result;
}
