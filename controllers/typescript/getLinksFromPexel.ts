import { createClient } from "pexels";
import importantWords from "../../AI/typescript/importantWords.json";
import transcription from "../../AI/python/transcription.json";

// Initialize Pexels client
const client = createClient(Bun.env.PEXELS_API_KEY as string);

// Extract segments and important words
const segments = transcription.segments;
const importantWordsArray = importantWords;

console.log(segments.map(segment => segment.text));
console.log(importantWordsArray);

// Initialize the data structure to hold segments with important words
const segmentsWithWords: {
    segmentId: number; word: string; start: number; end: number; imageUrl: string; // Placeholder for image URL
}[] = [];

// Use nested loops to ensure all combinations are checked
for (const segment of segments) {
    for (const word of importantWordsArray) {
        if (segment.text.includes(word)) {
            segmentsWithWords.push({
                segmentId: segment.id,
                word: word,
                start: segment.start,
                end: segment.end,
                imageUrl: "" // Placeholder for image URL
            });
            console.log(`Segment ID ${segment.id}:`, segment.text);
            console.log("Most Important Word:", word);
        }
    }
}

// Function to fetch images from Pexels and update segmentsWithWords
async function fetchImages() {
    for (const segmentWithWord of segmentsWithWords) {
        const query = segmentWithWord.word;
        try {
            const result = await client.photos.search({ query, per_page: 1 });
            if ("photos" in result && result.photos.length > 0) {
                segmentWithWord.imageUrl = result.photos[0].src.medium;
                console.log(`Image for ${query}:`, segmentWithWord.imageUrl);
            } else {
                console.log(`No images found for ${query}`);
            }
        } catch (err) {
            console.error(`Error fetching images for ${query}:`, err);
        }
    }

    // Convert the segmentsWithWords array to JSON
    const jsonData = JSON.stringify(segmentsWithWords, null, 2);

    // Write JSON data to a file
    Bun.write("segmentsWithWords.json", jsonData);
}

// Run the fetchImages function to fetch images and update JSON
fetchImages();
