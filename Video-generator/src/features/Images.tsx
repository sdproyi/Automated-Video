import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import pexelsImageLinks from "../../../controllers/typescript/segmentsWithWords.json";
import transcription from "../../../AI/python/transcription.json";

export const Images: React.FC = () => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();
	const currentTime = frame / fps;

	const currentSegment = React.useMemo(
		() =>
			transcription.segments.find(
				(segment) => currentTime >= segment.start && currentTime <= segment.end,
			),
		[currentTime],
	);

	const [currentImageUrl, setCurrentImageUrl] = React.useState("");

	// Function to find the image URL for the current segment, memoized with useCallback
	const findImageForSegment = React.useCallback((segmentId: number) => {
		const matchedLink = pexelsImageLinks.find(
			(link) => link.segmentId === segmentId,
		);
		return matchedLink ? matchedLink.imageUrl : null;
	}, []);

	// Update the image URL if the current segment changes
	React.useEffect(() => {
		if (currentSegment) {
			const imageUrl = findImageForSegment(currentSegment.id);
			if (imageUrl) {
				setCurrentImageUrl(imageUrl);
			}
		}
	}, [currentSegment, findImageForSegment]);

	return (
		<div className="w-full h-full pb-32 pt-10">
			<div className="w-fit h-full mx-auto justify-center items-center">
				{currentImageUrl && (
					<Img
						maxRetries={3}
						pauseWhenLoading={true}
						src={currentImageUrl}
						className="object-contain w-full h-full rounded-md"
					/>
				)}
			</div>
		</div>
	);
};
