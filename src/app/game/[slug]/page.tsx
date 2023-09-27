import changeImageUrl from "@/lib/utils/changeImageUrl";
import PlatformIcons from "@/components/GamePlatforms/PlatformIconsForGame";
import singleGameBySlug from "@/components/GamePage/singleGameBySlug";
import GameGallery, { screenshots } from "@/components/GamePage/GameGallery";
import gameScreenshotsBySlug from "@/components/GamePage/gameScreenshotsBySlug";
import GameRequirements, {
	Platforms,
} from "@/components/GamePage/GameRequirements";
import { Suspense } from "react";
import Loader from "@/components/ui/custom/Loader";
import { Balancer } from "react-wrap-balancer";
import { Metadata, ResolvingMetadata } from "next";
import Ratings from "@/components/GamePage/Ratings";
import AdditionalInfo, {
	AdditionalInfoProps,
} from "@/components/GamePage/AdditionalInfo";
import Metascore from "@/components/Metascore";
import NotFound from "@/app/not-found";

interface Props {
	params: { slug: string };
}

interface Data {
	name: string;
	background_image?: string;
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// fetch data
	const data: Data = (await singleGameBySlug(params.slug)) as Data;

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images ?? [];

	return {
		title: data.name,
		openGraph: {
			images: [changeImageUrl(data.background_image), ...previousImages],
		},
	};
}

export interface Rating {
	id: number;
	title: string;
	percent: number;
	count: number;
	color: string;
}

export type GameData = AdditionalInfoProps & {
	name: string;
	description_raw: string;
	background_image: string;
	released: string;
	parent_platforms: Platforms[];
	ratings: Rating[];
	platforms: Platforms[];
	detail?: string;
};

export default async function Game({ params }: Props) {
	const [data, screenshots]: [GameData, screenshots] = await Promise.all([
		singleGameBySlug(params.slug),
		gameScreenshotsBySlug(
			params.slug,
			process.env.NEXT_PUBLIC_RAWG_API_KEY ?? "",
		),
	]);

	if (data.detail) {
		return <NotFound />;
	}

	const dateObj = new Date(data.released);
	const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
		dateObj,
	);
	const formattedDate = `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;

	return (
		<main className="container mx-auto px-3 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
			<div className="absolute left-0 top-0 -z-10 h-full w-full bg-transparent">
				<div className="flex h-[500px] min-h-full w-full">
					<div
						style={
							{
								"--background-image": `url(${data.background_image})`,
							} as React.CSSProperties
						}
						className={`custom-bg-light dark:custom-bg-dark m-h-full z-10 h-[500px] w-full bg-cover bg-top bg-no-repeat`}
					></div>
				</div>
			</div>
			<Suspense fallback={<Loader />}>
				<GameGallery queryResult={screenshots} slug={params.slug} />
			</Suspense>
			<div className="mt-6 flex w-full items-center justify-start gap-2">
				<p className="mr-5 rounded-xl bg-zinc-700 px-2 py-1 text-center text-neutral-300 shadow-lg shadow-neutral-800">
					{formattedDate}
				</p>
				<PlatformIcons
					size={24}
					parent_platforms={data.parent_platforms}
				/>
				<Metascore
					metacritic={data.metacritic}
					size={24}
					className="ml-5"
				/>
			</div>
			<div className="my-6">
				<h1 className="break-words text-4xl font-bold tracking-wider text-neutral-800 dark:text-neutral-200 md:text-7xl">
					<Balancer>{data.name}</Balancer>
				</h1>
			</div>
			<div className="text-neutral-500 dark:text-neutral-300">
				<Balancer>{data.description_raw}</Balancer>
			</div>
			<div className="my-6 flex flex-wrap items-center justify-between">
				<div className="w-full md:w-2/6">
					<GameRequirements data={data} />
				</div>
				<div className="my-12 flex w-full flex-col items-center justify-around md:w-3/6 lg:my-0">
					<Ratings ratings={data.ratings} />
				</div>
			</div>
			<div className="my-12 flex flex-wrap justify-between">
				<AdditionalInfo data={data} />
			</div>
		</main>
	);
}
