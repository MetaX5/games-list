"use client";

import { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResultsList, results } from "./SearchResultsList";
import DebounceInput from "./DebounceInput";

interface SearchBarProps {
	apiKey: string;
	count?: number;
}

export interface SearchBarState {
	input: string;
	results?: results[];
}

export default function SearchBar({ apiKey, count }: SearchBarProps) {
	const [state, setState] = useState<SearchBarState>({
		input: "",
		results: [],
	});

	const changeState = useCallback((newState: SearchBarState) => {
		if (newState.results == undefined) {
			setState((prevState) => ({
				...prevState,
				input: newState.input,
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				...newState,
			}));
		}
	}, []);

	return (
		<>
			<div className="group flex h-10 w-full items-center rounded-lg bg-neutral-200 text-neutral-800 shadow-md shadow-white transition-all hover:bg-neutral-300 hover:transition-all dark:bg-neutral-800 dark:text-neutral-200 dark:shadow-black dark:hover:bg-neutral-700">
				<FaSearch
					className="ml-3 text-neutral-800 dark:text-neutral-200"
					id="search-icon"
				/>

				<DebounceInput
					count={count}
					state={state}
					changeState={changeState}
					apiKey={apiKey}
				/>
			</div>

			{state.results && state.results.length > 0 && state.input && (
				<SearchResultsList results={state.results} />
			)}
		</>
	);
}
