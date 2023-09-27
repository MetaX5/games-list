import "./globals.css";
import { Inter } from "next/font/google";
import gamesPage from "@/components/gamesPage";
import { use } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Provider } from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Games List",
	description: "Check out our games list",
	metadataBase: new URL("https://localhost:3000"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		images: [],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const fetchQuery = async () => {
		const data = await gamesPage({
			apiKey: process.env.RAWG_API_KEY,
		});
		return data;
	};

	const queryResults = use(fetchQuery());

	return (
		<html lang="en">
			<body
				className={twMerge(
					inter.className,
					"mx-auto max-w-[1920px] bg-slate-50 dark:bg-slate-950",
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Header count={queryResults?.count} />
					<Provider>{children}</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
