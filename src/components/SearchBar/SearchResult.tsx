"use client";

import Link from "next/link";

interface SearchResultProps {
	slug: string;
	name: string;
}

export const SearchResult = ({ slug, name }: SearchResultProps) => {
	return (
		<Link
			href={`/game/${slug}`}
			className="px-5 py-2 text-neutral-800 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
		>
			{name}
		</Link>
	);
};
