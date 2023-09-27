"use client";

import changeImageUrl from "@/lib/utils/changeImageUrl";
import PlatformIcons from "@/components/GamePlatforms/PlatformIconsForGame";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Placeholder from "../ui/custom/Placeholder";
import { ResultsArr } from "../getGamesPage";
import Metascore from "../Metascore";

interface ItemsProps {
	results?: ResultsArr[];
	fetchItems: (page?: string) => Promise<ResultsArr[] | undefined>;
}

export default function Items({ results, fetchItems }: ItemsProps) {
	const fetching = useRef(false);
	const [pages, setPages] = useState([results]);
	const items = pages.flatMap((page) => page);

	const loadMore = async (page: number) => {
		if (!fetching.current) {
			try {
				fetching.current = true;
				if (typeof page !== "number") return;

				const data = await fetchItems(String(page));
				setPages((prev) => [...prev, data]);
			} finally {
				fetching.current = false;
			}
		}
	};

	return (
		<InfiniteScroll
			hasMore
			pageStart={1}
			loadMore={loadMore}
			loader={<Placeholder key={"placeholder"} />}
			element="div"
			className="relative my-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
		>
			{items.map((game) => (
				<div
					key={game?.id}
					className="relative mx-auto flex w-fit flex-col items-center justify-start overflow-hidden rounded-lg bg-neutral-200 shadow-lg shadow-neutral-200 dark:bg-neutral-800 dark:shadow-black"
				>
					<Link
						className="transition-transform duration-300 ease-in-out hover:scale-105"
						href={`/game/${game?.slug}`}
					>
						<div className="max-h-40 overflow-hidden">
							<Image
								className="object-cover"
								width={600}
								height={400}
								quality={85}
								loading="lazy"
								alt={game?.slug ?? ""}
								src={changeImageUrl(
									game?.background_image ?? "",
								)}
								placeholder="blur"
								blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTY3IiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiIHN0eWxlPSJtYXJnaW46YXV0byI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiIGNsYXNzPSJiYWNrZ3JvdW5kIj48L3JlY3Q+PGcgZmlsbD0iIzMzMyIgY2xhc3M9Imljb24tdGV4dC13cmFwcGVyIGljb24tc3ZnLWdyb3VwIGljb25zdmciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY3IDE2LjMyNSkiIGNsYXNzPSJpY29uc3ZnLWltYWdlc3ZnIj48cGF0aCBjbGFzcz0iaW1hZ2UtcmVjdCIgZmlsbD0ibm9uZSIgZD0iTTAgMGg3MHY3Mi4xNTJIMHoiPjwvcGF0aD48c3ZnIHdpZHRoPSI3MCIgaGVpZ2h0PSI3Mi4xNTIiIGNsYXNzPSJpbWFnZS1zdmctc3ZnIHByaW1hcnkiIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEyMy4yMjUgMTI3LjAxMyI+PHBhdGggZD0iTTYxLjM4IDg5Ljg2Yy0xLjc0LS4xNS0zLjQ4LS40NC01LjIxLS40NS0xMC4zMyAwLTIwLjY2IDAtMzEtLjA4YTYgNiAwIDAgMS0zLjczLTEuNUMxNS4yIDgxLjc0IDkuMDYgNzUuNTIgMi45MiA2OS4zLS45NCA2NS40LTEgNjIuNTUgMi45IDU4LjYxYzEwLjktMTEgMjEuODgtMjEuOSAzMi44Mi0zMi44NUM0NC4zIDE3LjE3IDUyLjg2IDguNTUgNjEuMzcgMGwxOS4wNyAxOS4yYy00LjY5IDQuNjUtOS41MyA5LjQzLTE0LjM1IDE0LjI0LTkuNDggOS40Ni0xOC45MiAxOS0yOC40NiAyOC4zOS0xLjU5IDEuNTctMS43MiAyLjQ4IDAgNC4xNiA3LjQ1IDcuMjQgMTQuNzUgMTQuNjcgMjIuMDggMjJhMjQuMjYgMjQuMjYgMCAwIDEgMS41OCAxLjkxeiIgZmlsbD0iI2ZiYzY0ZCI+PC9wYXRoPjxwYXRoIGQ9Ik02MS4zIDg5Ljk0YTE1LjE3IDE1LjE3IDAgMCAwIDIuNDItMS42NVE3NC40NiA3Ny42NiA4NS4xNCA2N2MzLTMgMy0zLjE5IDAtNi4xNFE3NSA1MC42OCA2NC44MyA0MC41MWMtLjQtLjQtLjc0LS44NS0xLjQ2LTEuNzEgMS4xNy0uMTIgMS45Mi0uMjYgMi42Ny0uMjYgMTAuNjcgMCAyMS4zNCAwIDMyIC4wOGE1Ljk0IDUuOTQgMCAwIDEgMy42NiAxLjU2YzYuMzMgNi4xNSAxMi41MyAxMi40MyAxOC43NiAxOC42OCAzLjYzIDMuNjUgMy43MiA2LjM5LjA3IDEwLjA4UTEwNSA4NC42NiA4OS4yOSAxMDAuMjZjLTguNDggOC40OS0xNyAxNi45My0yNS40MiAyNS40Ny0xLjU5IDEuNjItMi42MSAxLjc3LTQuMjUuMDgtNC44Ni01LTkuODYtOS45Mi0xNC44NS0xNC44My0xLjMyLTEuMjktMS40OS0yLjI3IDAtMy43IDUuMTMtNSAxMC4xNS0xMC4xMSAxNS4xNy0xNS4yMWExNC4xNCAxNC4xNCAwIDAgMCAxLjQ3LTIuMjF6IiBmaWxsPSIjMjU4YmZhIj48L3BhdGg+PC9zdmc+PC9zdmc+PC9nPjxwYXRoIGQ9Ik01MS41OCA5NS45MTd2MS4yNGMtMS44LTEuMDQtNC4wNC0xLjY0LTYuMzItMS42NC02LjA4IDAtMTEgNC4yNC0xMSAxMC43MiAwIDYuNDQgNC45MiAxMC44IDExIDEwLjggMi4yNCAwIDQuMzItLjU2IDYuMDgtMS41Mi0uMTYgMy40LTMuNTYgNS40LTYuODggNS40LTMgMC01LS42NC03LjM2LTEuMjhsLTEuMDggNC4xMmMzLjM2Ljk2IDQuNCAxLjQ0IDkuNzYgMS40NCA4LjI0IDAgMTEuMzYtNi4xMiAxMS4zNi0xMS43MnYtMTcuNTZabS0xMS44NCAxMC4zNmMwLTMuMjggMi43Ni01Ljc2IDYuNDgtNS43NiAyLjEyIDAgNCAuNjQgNS4zNiAxLjc2djhjLTEuMzIgMS4xMi0zLjI0IDEuNzYtNS4zNiAxLjc2LTMuNzIgMC02LjQ4LTIuMzItNi40OC01Ljc2Wm0zOC42OC0xMC4zNnYxLjM2Yy0xLjg0LTEuMDgtNC4wOC0xLjgtNi4zNi0xLjgtNi44IDAtMTAuOCA1LjQ0LTEwLjggMTEuMjQgMCA1Ljc2IDQgMTEuMjQgMTAuOCAxMS4yNCAyLjQgMCA0LjU2LS43MiA2LjM2LTEuOTJ2MS42aDUuNTZ2LTIxLjcyWm0wIDE1LjJjLTEuMzYgMS4xNi0zLjI0IDEuODQtNS4zNiAxLjg0LTMuOTIgMC02LjQ0LTIuOTYtNi40NC02LjI0IDAtMy4yNCAyLjQ4LTYuMiA2LjQ0LTYuMiAyLjA4IDAgNCAuNzIgNS4zNiAxLjg4Wm0zNS44LTE1LjZjLTIuNTYgMC00Ljk2IDEuMDQtNi44IDIuNzYtMS40OC0xLjkyLTMuODQtMi43Ni03LjItMi43Ni0yLjEyIDAtNC4wOC42NC01LjY0IDEuNzZ2LTEuMzZoLTUuNnYyMS43Mmg1LjZ2LTE1LjRjMS4xNi0xLjA4IDIuNzItMS43MiA0LjY4LTEuNzIgMi44OCAwIDQuMzYgMS42OCA0LjM2IDV2MTIuMTJoNS41NnYtMTIuMDRjMC0xLjk2LS4wNC0yLjc2LS4yNC0zLjM2IDEuMTYtMS4wOCAyLjQ4LTEuNzIgNC4zMi0xLjcyIDMuMDQgMCA0LjcyIDEuNjQgNC43MiA1djEyLjEyaDUuNTZ2LTEyLjEyYzAtNy4wNC0yLjkyLTEwLTkuMzItMTBabTM0LjYgMTIuODRjMC0uMzYuMDQtLjguMDQtMS4yNCAwLTYuNzYtMy44OC0xMS42LTEwLjU2LTExLjYtNi41NiAwLTExLjEyIDUtMTEuMTIgMTEuMjQgMCA2LjIgNC41NiAxMS4yIDExLjEyIDExLjIgNC4yNCAwIDcuOC0xLjc2IDkuOC00LjQ4bC0zLjU2LTIuOTZjLTEuMiAxLjY0LTMuMzIgMi42OC01LjYgMi42OC0zLjMyIDAtNS42LTItNi4yLTQuODRabS0xMC41Mi04LjRjMy43MiAwIDUuMDQgMi4zNiA1LjI0IDQuODRoLTEwLjc2Yy41Mi0yLjY4IDIuNi00Ljg0IDUuNTItNC44NFptMTMuMzIgMTUuOTJjMy4yIDEuNTYgNS42NCAyLjA4IDkuNCAyLjA4IDUuNTYgMCA4LjcyLTIuNzIgOC43Mi02Ljg0IDAtMy45Ni0yLjkyLTUuNzItNy45Ni02Ljc2LTMuNDgtLjcyLTQuOC0xLjI4LTQuOC0yLjQ4IDAtMS4xNiAxLjA4LTEuOTIgMy4yLTEuOTIgMi4xNiAwIDQuNjQuNiA2Ljc2IDEuNGwxLjg0LTQuMDhjLTIuMzYtLjk2LTUuMDgtMS43Ni04LjQ4LTEuNzYtNS4wNCAwLTguMjggMi43Mi04LjI4IDYuNjQgMCA0LjIgMy40IDUuNzIgOC4wOCA2Ljc2IDMuMzYuNzIgNC42IDEuMjggNC42IDIuNTIgMCAxLjEyLTEgMi4wOC0zLjU2IDIuMDgtMi43MiAwLTQuNzYtLjYtNy40NC0xLjc2WiIgZGF0YS1ncmE9InBhdGgtbmFtZSIgY2xhc3M9InRwLW5hbWUgaWNvbnN2Zy1uYW1lc3ZnIGZpbGwtYmxhY2sgZGFyazpmaWxsLXdoaXRlIj48L3BhdGg+PHBhdGggZD0iTTM5LjI2IDEzNS40MzdoNDguOTk1djFIMzkuMjZ6bTc2LjQ4NSAwaDQ4Ljk5NXYxaC00OC45OTV6bS0yNC40OSA0LjEwOHYtNy4yMmguOTF2Ni40NGgzLjE2di43OGgtNC4wN1ptNi4zNSAwdi03LjIyaC45MXY3LjIyaC0uOTFabTMuMzYtLjkzLjU1LS42NHEuMzkuNC45MS42NXQxLjA4LjI1cS43MiAwIDEuMTEtLjMzLjQtLjMyLjQtLjg1IDAtLjI3LS4wOS0uNDctLjEtLjE5LS4yNi0uMzMtLjE2LS4xMy0uMzgtLjI0LS4yMi0uMTEtLjQ3LS4yM2wtMS4wMy0uNDVxLS4yNi0uMTEtLjUyLS4yNy0uMjYtLjE1LS40Ny0uMzctLjIxLS4yMi0uMzQtLjUzLS4xNC0uMy0uMTQtLjY5IDAtLjQxLjE3LS43Ni4xNy0uMzUuNDgtLjYxLjMtLjI2LjcxLS40LjQxLS4xNS45MS0uMTUuNjUgMCAxLjIuMjUuNTUuMjUuOTMuNjRsLS40OS42cS0uMzMtLjMyLS43My0uNS0uNC0uMTgtLjkxLS4xOC0uNjEgMC0uOTcuMjgtLjM3LjI4LS4zNy43NyAwIC4yNy4xLjQ1LjExLjE4LjI4LjMyLjE4LjEzLjM5LjI0LjIxLjEuNDMuMTlsMS4wMi40NHEuMzEuMTMuNTguMy4yOC4xNy40OC40LjE5LjIyLjMxLjUzLjExLjMuMTEuNyAwIC40Mi0uMTcuOC0uMTcuMzctLjQ5LjY1LS4zMS4yOC0uNzcuNDQtLjQ1LjE2LTEuMDIuMTYtLjc2IDAtMS40MS0uMjgtLjY1LS4yOS0xLjEyLS43OFptOC42OC45M3YtNi40NWgtMi4xOHYtLjc3aDUuMjh2Ljc3aC0yLjE4djYuNDVoLS45MloiIGRhdGEtZ3JhPSJwYXRoLXNsb2dhbiIgY2xhc3M9InRwLXNsb2dhbiBpY29uc3ZnLXNsb2dhbnN2ZyBmaWxsLWJsYWNrIGRhcms6ZmlsbC13aGl0ZSI+PC9wYXRoPjwvZz48L3N2Zz4="
							/>
						</div>
						<div className="mx-3">
							<div className="mr-auto mt-2 flex w-full items-center justify-start gap-2">
								<PlatformIcons
									parent_platforms={game?.parent_platforms}
								/>
								<Metascore
									metacritic={game?.metacritic}
									size={22}
									className="ml-auto"
								/>
							</div>
							<div className="my-3 flex">
								<span className="text-lg font-bold text-neutral-800 hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400">
									{game?.name}
								</span>
							</div>
						</div>
					</Link>
				</div>
			))}
		</InfiniteScroll>
	);
}
