import { AbsoluteFill, staticFile, Audio } from "remotion";
import { Images } from "./features/Images";
import { Subtitles } from "./features/Subtitles";
import { Avatar } from "./features/Avatar";

export const MyComposition = () => {
	console.log(staticFile("text2speech.wav"));

	return (
		<AbsoluteFill className="bg-black items-center justify-center">
			<Images />
			<Avatar />
			<Subtitles />
			<Audio src={staticFile("text2speech.wav")} />
		</AbsoluteFill>
	);
};
