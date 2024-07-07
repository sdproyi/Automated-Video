import { AbsoluteFill, staticFile, Audio } from "remotion";
import { Images } from './features/Images';
import { Subtitles } from "./features/Subtitles";
import { Avatar } from "./features/Avatar";
import "./font.css";

export const MyComposition = () => {
	return (
		<AbsoluteFill
			style={{ fontFamily: "Poppins" }}
			className="bg-black items-center justify-center"
		>
			<Images />
			<Avatar />
			<Subtitles />
			<Audio src={staticFile("text2speech.wav")} />
		</AbsoluteFill>
	);
};
