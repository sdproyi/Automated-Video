import type React from "react";
import { useVideoConfig, useCurrentFrame } from "remotion";
import transcription from "../../../AI/python/transcription.json";

export const Subtitles: React.FC = () => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	// Convert frame to seconds
	const currentTime = frame / fps;

	// Find the segment that matches the current time
	const currentSegment = transcription.segments.find(
		(segment) => currentTime >= segment.start && currentTime <= segment.end,
	);

	return (
		<div className="text-2xl bottom-10 w-1/2 text-center font-bold absolute">
			{currentSegment ? (
				<div key={currentSegment.id}>
					{currentSegment.words.map((word, index) => {
						const isCurrentWord = currentTime >= word.start;
						return (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								style={{ color: isCurrentWord ? "white" : "grey" }}
							>
								{word.word}{" "}
							</span>
						);
					})}
				</div>
			) : null}
		</div>
	);
};
