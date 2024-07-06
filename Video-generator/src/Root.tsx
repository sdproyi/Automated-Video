import type React from "react";
import { useEffect, useState } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import audioFile from "../public/text2speech.wav"; // Adjust this path
import { MyComposition } from "./Composition";
import { Composition } from "remotion";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const fps = 30; // Frames per second

  useEffect(() => {
    const fetchAudioDuration = async () => {
      try {
        const duration = await getAudioDurationInSeconds(audioFile);
        setAudioDuration(duration);
        console.log("Audio duration:", duration);
      } catch (error) {
        console.error("Error getting audio duration:", error);
      }
    };

    fetchAudioDuration();
  }, []);

  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={audioDuration ? Math.ceil(audioDuration * fps) : 100 * fps}
        fps={fps}
        width={1280}
        height={720}
        defaultProps={{
          titleText: "no title yet",
          titleColor: "#000000",
          logoColor: "#00bfff",
        }}
      />
    </>
  );
};