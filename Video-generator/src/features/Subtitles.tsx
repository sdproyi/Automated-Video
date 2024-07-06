import type React from "react";
import { useVideoConfig, useCurrentFrame } from "remotion";

// Define the structure of your transcription data
interface Word {
	word: string;
	start: number;
	end: number;
}

interface Segment {
	id: number;
	start: number;
	end: number;
	words: Word[];
}

interface Transcription {
	segments: Segment[];
}

// Import your transcription data
import transcriptionData from "../../../AI/python/transcription.json";

export const Subtitles: React.FC = () => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	// Ensure transcriptionData is of type Transcription
	const transcription: Transcription = transcriptionData;

	// Convert frame to seconds
	const currentTime = frame / fps;

	// Find the segment that matches the current time
	const currentSegment = transcription.segments.find(
		(segment) => currentTime >= segment.start && currentTime <= segment.end,
	);

	if (!currentSegment) {
		return null;
	}

	return (
		<div className="text-2xl bottom-10 w-1/2 text-center font-bold absolute">
			{currentSegment.words.map((word) => {
				const isCurrentWord = currentTime >= word.start;
				// Create a unique key using a combination of word and start time
				const wordKey = `${word.word}-${word.start}`;
				return (
					<span
						key={wordKey}
						style={{ color: isCurrentWord ? "white" : "grey" }}
					>
						{word.word}{" "}
					</span>
				);
			})}
		</div>
	);
};
