"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Logo } from "@/components/ui/custom/Logo";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";

export default function Header({ count }: { count: number | undefined }) {
	const [headerBackground, setHeaderBackground] = useState("bg-transparent");

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
			className={`sticky inset-x-0 top-0 z-20 mb-12 flex w-full flex-wrap items-center justify-center px-3 md:flex-nowrap md:px-8 lg:px-16 xl:px-32 2xl:px-48 ${headerBackground}`}
		>
			<div className="flex basis-full justify-center md:basis-1/6 md:justify-start">
				<p className="h-auto w-[120px]">
					<Link href="/">
						<Logo />
					</Link>
				</p>
			</div>
			<div className="relative z-10 flex basis-full flex-col items-center md:basis-4/6">
				<SearchBar
					count={count}
					apiKey={process.env.NEXT_PUBLIC_RAWG_API_KEY ?? ""}
				/>
			</div>
			<div className="fixed right-4 top-4 mt-4 md:relative md:right-0 md:top-0 md:mt-0 md:flex md:basis-1/6 md:justify-end">
				<ThemeSwitcher />
			</div>
		</header>
	);
}
