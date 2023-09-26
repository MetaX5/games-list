import { cn } from "@/lib/utils";

const Metascore = ({
	metacritic,
	size = 40,
	className,
}: {
	metacritic: number | undefined;
	size?: number;
	className?: string;
}) => {
	const metascoreClass = () => {
		if (!metacritic) return;
		if (metacritic >= 85) {
			return "text-green-500 border-green-500";
		} else if (metacritic >= 65) {
			return "text-yellow-500 border-yellow-500";
		} else if (metacritic >= 50) {
			return "text-orange-500 border-orange-500";
		} else {
			return "text-red-500 border-red-500";
		}
	};

	return metacritic != null ? (
		<div
			className={cn(
				`flex items-center justify-center rounded-md border border-solid leading-[0]`,
				metascoreClass(),
				className,
			)}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				fontSize: `${size / 2}px`,
			}}
		>
			{metacritic}
		</div>
	) : null;
};

export default Metascore;
