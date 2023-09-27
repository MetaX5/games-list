import { Rating } from "@/app/game/[slug]/page";
import { Platforms } from "./GamePage/GameRequirements";

interface Parent_platforms {
	platform: {
		id: number;
		name: string;
		slug: string;
	};
}

export interface ResultsArr {
	id: number;
	name: string;
	slug: string;
	background_image: string;
	released: string;
	rating: number;
	ratings: Rating[];
	platforms: Platforms[];
	parent_platforms: Parent_platforms[];
	metacritic: number | null;
}

export interface GamesPageResults {
	count: number;
	next: string;
	previous: string | null;
	results: ResultsArr[];
}

interface GamesPageProps {
	page?: string;
	apiKey?: string;
}

export default async function gamesPage({
	page = "1",
	apiKey = process.env.RAWG_API_KEY,
}: GamesPageProps): Promise<GamesPageResults | undefined> {
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
