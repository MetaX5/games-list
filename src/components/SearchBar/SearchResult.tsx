"use client";

import Link from "next/link";

export const SearchResult = ({
	slug,
	name,
}: {
	slug: string;
	name: string;
}) => {
	return (
		<Link
			href={`/game/${slug}`}
			className="py-2 px-5 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
		>
			{name}
		</Link>
	);
};
