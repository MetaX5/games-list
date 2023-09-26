import Link from "next/link";
import React from "react";
import { Logo } from "./ui/custom/Logo";

const Navbar = () => {
	const links = [
		["Home", "/"],
		["Blog", "/blog"],
		["Contact", "/contact"],
	];

	return (
		<nav className="flex flex-row bg-transparent flex-wrap basis-full md:basis-3/5 items-center">
			<div className="basis-full md:basis-1/5">
				<p className="w-[120px] h-auto">
					<Logo />
				</p>
			</div>
			<div className="flex justify-center items-center h-fit gap-10 basis-full md:basis-4/5">
				{links.map(([title, url]) => (
					<Link
						key={title}
						className="text-gray-500 hover:text-gray-300"
						href={url}
					>
						{title}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
