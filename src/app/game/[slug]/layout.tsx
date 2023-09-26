export const metadata = {
	title: "Game",
	description: "Detailed information about game",
};

export default function GameLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
