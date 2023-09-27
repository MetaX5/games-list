"use client";

import { SearchResult } from "./SearchResult";

export interface Results {
	slug?: string;
	name?: string;
}

export const SearchResultsList = ({ results }: { results?: Results[] }) => {
	if (!results) return null;
	return (
		<div className="absolute left-0 top-9 z-10 mt-4 flex h-auto max-h-72 w-full flex-col overflow-y-auto rounded-lg bg-white shadow-md shadow-black dark:bg-black">
			{results.map((result, id) => {
				return (
					<SearchResult
						slug={result.slug ?? ""}
						name={result.name ?? ""}
						key={id}
					/>
				);
			})}
		</div>
	);
};
