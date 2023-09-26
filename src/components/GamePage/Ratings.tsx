"use client";

import { rating } from "@/app/game/[slug]/page";
import { ProgressBar } from "../ui/custom/ProgressBar";

interface Props {
	ratings: rating[];
}

const Ratings = (props: Props) => {
	const { ratings } = props;

	const ratingsSorted = ratings.sort((a, b) => b.id - a.id);

	const ratingsArray = ratingsSorted.map((rating) => (
		<div
			key={rating.id}
			className="flex w-full items-center justify-between sm:px-20 md:px-4"
		>
			<div>
				{rating.title}{" "}
				<span className="font-bold">({rating.count})</span>
			</div>
			<ProgressBar
				childrenClassName={rating.color}
				value={rating.percent}
				className="w-2/5"
			/>
		</div>
	));

	return <>{ratingsArray}</>;
};

export default Ratings;
