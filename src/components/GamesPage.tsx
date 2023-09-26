import { rating } from "@/app/game/[slug]/page";
import { platforms } from "./GamePage/GameRequirements";

interface parent_platforms {
	platform: {
		id: number;
		name: string;
		slug: string;
	};
}

export interface resultsArr {
	id: number;
	name: string;
	slug: string;
	background_image: string;
	released: string;
	rating: number;
	ratings: rating[];
	platforms: platforms[];
	parent_platforms: parent_platforms[];
	metacritic?: number;
}

export interface GamesPageResults {
	count: number;
	next: string;
	previous: string | null;
	results: resultsArr[];
}

export default async function GamesPage({
	page = "1",
	apiKey = process.env.RAWG_API_KEY,
}: {
	page?: string;
	apiKey?: string;
}): Promise<GamesPageResults | undefined> {
	try {
		const res = await fetch(
			`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`,
			{ next: { revalidate: 3600 } },
		);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		const result: GamesPageResults = (await res.json()) as GamesPageResults;
		return result;
	} catch (error) {
		console.error(error);
	}
}
