import { useCallback, useEffect, useMemo, useRef } from "react";
import { SearchBarState } from "./SearchBar";
import useDebounce from "@/app/hooks/useDebounce";
import { Results } from "./SearchResultsList";

interface DebounceInputProps {
	count?: number;
	state: SearchBarState;
	changeState: (prevState: SearchBarState) => void;
	apiKey: string;
}

interface Json {
	results: Results[];
}

const DebounceInput = ({
	count,
	state,
	changeState,
	apiKey,
}: DebounceInputProps) => {
	const inputElement = useRef<HTMLInputElement>(null);
	const gamesCount = useMemo(() => count?.toLocaleString("en-US"), [count]);
	const debouncedValue = useDebounce(state.input, 500);

	const fetchData = useCallback(
		async (value: string) => {
			if (value === "") return;
			try {
				const response = await fetch(
					`https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
						value,
					)}`,
				);
				const json: Json = (await response.json()) as Json;
				const results: Results[] = json.results;
				changeState({
					input: value,
					results,
				});
			} catch (error) {
				console.error(error);
			}
		},
		[changeState, apiKey],
	);

	const handleChange = (value: string) => {
		changeState({ input: value });
	};

	useEffect(() => {
		const handleWindowClick = (e: MouseEvent) => {
			if (e.target !== inputElement.current) {
				changeState({
					input: "",
					results: [],
				});
			}
		};

		window.addEventListener("click", handleWindowClick);

		return () => {
			window.removeEventListener("click", handleWindowClick);
		};
	}, [changeState]);

	useEffect(() => {
		fetchData(debouncedValue).catch(console.error);
	}, [debouncedValue, fetchData]);

	return (
		<input
			className="ml-2 h-full w-full border-none bg-transparent text-sm focus:outline-none"
			ref={inputElement}
			placeholder={`Search ${gamesCount} games`}
			value={state.input}
			onChange={(e) => {
				handleChange(e.target.value);
			}}
		/>
	);
};

export default DebounceInput;
