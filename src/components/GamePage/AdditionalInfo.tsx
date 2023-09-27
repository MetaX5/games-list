import Metascore from "../Metascore";
import { Platforms } from "./GameRequirements";

interface Arr {
	id: number;
	name: string;
}

export interface AdditionalInfoProps {
	platforms?: Platforms[];
	genres?: Arr[];
	released?: string;
	developers?: Arr[];
	publishers?: Arr[];
	website?: string;
	esrb_rating?: {
		name: string | null;
	};
	metacritic: number | null;
}

const AdditionalInfo = ({ data }: { data: AdditionalInfoProps }) => {
	const platformsArr = data.platforms;
	let age_rating = data.esrb_rating?.name;

	const websiteURL = () => {
		if (data.website && data.website !== "") {
			const urlObj = new URL(data.website);
			urlObj.protocol = "https:";
			return urlObj.href;
		} else {
			return "";
		}
	};

	switch (age_rating) {
		case "Everyone":
			age_rating = "Everyone";
			break;
		case "Everyone 10+":
			age_rating = "Everyone 10+";
			break;
		case "Teen":
			age_rating = "Teen 13+";
			break;
		case "Mature":
			age_rating = "Mature 17+";
			break;
		case "Adults Only":
			age_rating = "Adults Only 18+";
			break;
		case "Rating Pending":
			age_rating = "Rating Pending";
			break;
		default:
			age_rating = "Non rated";
	}

	const displayArray = (arr: Arr[] | undefined) => {
		if (!arr || arr.length === 0) return "-";
		return arr.map((element, index) =>
			index < arr.length - 1 ? (
				<span key={element.id}>
					{element.name}
					{", "}
				</span>
			) : (
				<span key={element.id}>{element.name}</span>
			),
		);
	};

	return (
		<>
			<div className="my-4 flex w-full justify-between">
				<div className="flex w-1/2 flex-col md:w-1/3">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Platforms
					</h3>
					<p>
						{platformsArr?.length === 0 || !platformsArr
							? "-"
							: platformsArr.map((platforms, index) =>
									index < platformsArr.length - 1 ? (
										<span key={platforms.platform.id}>
											{platforms.platform.name}
											{", "}
										</span>
									) : (
										<span key={platforms.platform.id}>
											{platforms.platform.name}
										</span>
									),
							  )}
					</p>
				</div>
				<div className="flex w-1/2 flex-col pl-8 md:w-1/3 md:pl-0">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Genre
					</h3>
					<p>{displayArray(data.genres)}</p>
				</div>
			</div>
			<div className="my-4 flex w-full justify-between">
				<div className="flex w-1/2 flex-col md:w-1/3">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Developer
					</h3>
					<p>{displayArray(data.developers)}</p>
				</div>
				<div className="flex w-1/2 flex-col pl-8 md:w-1/3 md:pl-0">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Publisher
					</h3>
					<p>{displayArray(data.publishers)}</p>
				</div>
			</div>
			<div className="my-4 flex w-full justify-between">
				<div className="flex w-1/2 flex-col md:w-1/3">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Age rating
					</h3>
					<p>{age_rating}</p>
				</div>
				<div className="flex w-1/2 flex-col pl-8 md:w-1/3 md:pl-0">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Release Date
					</h3>
					<p>{data.released}</p>
				</div>
			</div>
			{data.metacritic == null ? null : (
				<div className="my-4 flex w-full justify-between">
					<div className="flex w-1/2 flex-col md:w-1/3">
						<h3 className="mb-2 font-semibold text-neutral-600">
							Metascore
						</h3>
						<Metascore metacritic={data.metacritic} />
					</div>
				</div>
			)}
			<div className="my-4 flex w-full justify-between">
				<div className="flex flex-col md:w-1/3">
					<h3 className="mb-2 font-semibold text-neutral-600">
						Website
					</h3>
					<p>
						<a
							className="break-words break-all underline hover:text-neutral-500"
							href={websiteURL()}
							rel="nofollow noreferrer noopener"
						>
							{websiteURL()}
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default AdditionalInfo;
