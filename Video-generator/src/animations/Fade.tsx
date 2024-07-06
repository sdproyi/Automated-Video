import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type FadeProps = {
	children: React.ReactElement;
	fadeOptions?: "fadeIn" | "fadeOut" | "fadeInOut";
};

export const Fade: React.FC<FadeProps> = ({
	children,
	fadeOptions = "fadeIn",
}) => {
	const frame = useCurrentFrame();
	let fadeIn = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	switch (fadeOptions) {
		case "fadeIn":
			fadeIn = interpolate(frame, [30, 50], [0, 1], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			});
			break;
		case "fadeOut":
			fadeIn = interpolate(frame, [0, 30], [1, 0], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			});
			break;
		case "fadeInOut":
			fadeIn = interpolate(frame, [0, 50], [0, 1], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			});
			break;
		default:
			throw new Error(`Invalid fadeOptions: ${fadeOptions}`);
	}

	return (
		<span className="w-full h-full">
			<span style={{ opacity: fadeIn }} >
				{children}
			</span>
		</span>
	);
};
