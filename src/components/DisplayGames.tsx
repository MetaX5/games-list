import getGamesPage from "./getGamesPage";
import Items from "./IninityScroll/Items";

async function fetchItems(page = "1") {
	"use server";

	const data = await getGamesPage({ page });
	return data?.results;
}

export default async function DisplayGames() {
	const results = await fetchItems("1");

	return <Items results={results} fetchItems={fetchItems} />;
}
