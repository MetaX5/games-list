"use client";

import { Rating } from "@/app/game/[slug]/page";
import { ProgressBar } from "../ui/custom/ProgressBar";

interface Color {
	color: string;
}

type RatingColors = Record<string, Color>;

const Ratings = ({ ratings }: { ratings: Rating[] }) => {
	const ratingColors: RatingColors = {
		exceptional: {
			color: "bg-green-500",
		},
		recommended: {
			color: "bg-blue-500",
		},
		meh: {
			color: "bg-orange-500",
		},
		skip: {
			color: "bg-red-500",
		},
	};

	const ratingsArr: Rating[] = ratings.map((rating) => ({
		id: rating.id,
		title: rating.title,
		percent: rating.percent,
		count: rating.count,
		color: ratingColors[rating.title].color,
	}));

	const ratingsSorted = ratingsArr.sort((a, b) => b.id - a.id);

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
