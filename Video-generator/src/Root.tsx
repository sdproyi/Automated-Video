import type React from "react";
import { useEffect, useState } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Composition, continueRender, delayRender } from "remotion";
import audioFile from "../public/text2speech.wav";
import { MyComposition } from "./Composition";
import "./style.css";

export const RemotionRoot: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [audioDuration, setAudioDuration] = useState<number>(1);
	const fps = 30; // Frames per second

	useEffect(() => {
		const fetchAudioDuration = async () => {
			try {
				const duration = await getAudioDurationInSeconds(audioFile);
				setAudioDuration(Math.ceil(duration * fps));
				continueRender(handle);
			} catch (error) {
				console.error("Error getting audio duration:", error);
				continueRender(handle);
			}
		};
		fetchAudioDuration();
	}, [handle]);

	return (
		<Composition
			id="MyComp"
			component={MyComposition}
			durationInFrames={audioDuration}
			fps={fps}
			width={1280}
			height={720}
			defaultProps={{
				titleText: "no title yet",
				titleColor: "#000000",
				logoColor: "#00bfff",
			}}
		/>
	);
};
