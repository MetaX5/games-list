import {
	Android,
	Ios,
	Linux,
	Macos,
	Nintendo,
	Playstation,
	Windows,
	Xbox,
} from "@/components/GamePlatforms/PlatformIcons";

export interface Platforms {
	platform: {
		name: string;
	};
}

interface Props {
	parent_platforms?: Platforms[];
	size?: number;
}

export default function GetPlatformIconsForGame(props: Props) {
	const icons: JSX.Element[] = [];
	const { parent_platforms, size = 16 } = props;

	if (!parent_platforms) return <></>;

	parent_platforms.map(({ platform: { name } }) => {
		if (name.toLowerCase().includes("pc")) {
			icons.push(
				<Windows
					key={"windows"}
					title={name}
					width={size}
					height={size}
				/>,
			);
		}
		if (name.toLowerCase().includes("playstation")) {
			icons.push(
				<Playstation
					key={"playstation"}
					title={name}
					width={size}
					height={size}
				/>,
			);
		}
		if (name.toLowerCase().includes("xbox")) {
			icons.push(
				<Xbox key={"xbox"} title={name} width={size} height={size} />,
			);
		}
		if (name.toLowerCase().includes("linux")) {
			icons.push(
				<Linux key={"linux"} title={name} width={size} height={size} />,
			);
		}
		if (name.toLowerCase().includes("nintendo")) {
			icons.push(
				<Nintendo
					key={"nintendo"}
					title={name}
					width={size}
					height={size}
				/>,
			);
		}
		if (name.toLowerCase().includes("ios")) {
			icons.push(
				<Ios key={"ios"} title={name} width={size} height={size} />,
			);
		}
		if (name.toLowerCase().includes("mac")) {
			icons.push(
				<Macos key={"macos"} title={name} width={size} height={size} />,
			);
		}
		if (name.toLowerCase().includes("android")) {
			icons.push(
				<Android
					key={"andorid"}
					title={name}
					width={size}
					height={size}
				/>,
			);
		}
	});

	return <>{icons}</>;
}
