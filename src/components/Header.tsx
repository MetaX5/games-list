"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Logo } from "@/components/ui/custom/Logo";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";

export default function Header({ count }: { count: number | undefined }) {
	const [headerBackground, setHeaderBackground] =
		useState<string>("bg-transparent");

	useEffect(() => {
		const handleScroll = () => {
			const shouldChangeBackground = window.scrollY > 30;
			if (shouldChangeBackground) {
				setHeaderBackground(
					"backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800",
				);
			} else {
				setHeaderBackground("");
			}
		};

		handleScroll();

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`px-3 md:px-8 lg:px-16 xl:px-32 2xl:px-48 mb-12 z-20 sticky top-0 inset-x-0 flex w-full items-center justify-center flex-wrap md:flex-nowrap ${headerBackground}`}
		>
			<div className="basis-full md:basis-1/6 flex md:justify-start justify-center">
				<p className="w-[120px] h-auto">
					<Link href="/">
						<Logo />
					</Link>
				</p>
			</div>
			<div className="flex-col z-10 relative flex items-center basis-full md:basis-4/6">
				<SearchBar
					count={count}
					apiKey={process.env.NEXT_PUBLIC_RAWG_API_KEY ?? ""}
				/>
			</div>
			<div className="md:basis-1/6 md:flex md:justify-end md:mt-0 mt-4 fixed md:relative md:top-0 md:right-0 top-4 right-4">
				<ThemeSwitcher />
			</div>
		</header>
	);
}
