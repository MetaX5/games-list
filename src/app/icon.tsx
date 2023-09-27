import { Logo } from "@/components/ui/custom/Logo";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<Logo width={size.width} height={size.height} />
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
