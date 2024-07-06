import Groq from "groq-sdk";
import transcription from "../python/transcription.json";

const groq = new Groq({ apiKey: Bun.env.GROQ_API_KEY });

async function getImportantWords(fullTranscription: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant tasked with extracting visually descriptive words or short phrases from a video transcription. Your response should contain only words or phrases that appear exactly as they are in the original text, separated by commas. Focus on terms that could be used for image searching. Include both single words and short phrases (up to 3 words) that are visually descriptive or represent concrete concepts."
      },
      {
        role: "user",
        content: `Extract 10-15 most visually descriptive words or short phrases (up to 3 words) from this video transcription for image searching. Use only exact words or phrases from the text. Respond with only these words/phrases, separated by commas:\n\n${fullTranscription}`
      }
    ],
    model: "llama3-8b-8192",
  });

  return chatCompletion.choices[0]?.message?.content?.trim() || "";
}

function processWords(wordsString: string, fullText: string): string[] {
  const words = wordsString.split(',').map(word => word.trim()).filter(word => word !== '');
  return words.filter(word => {
    const regex = new RegExp(`\\b${word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    return regex.test(fullText);
  });
}

async function processTranscription() {
  const fullTranscription = transcription.segments.map(segment => segment.text).join(" ");
  const importantWordsString = await getImportantWords(fullTranscription);
  const importantWordsArray = processWords(importantWordsString, fullTranscription);
  await Bun.write("importantWords.json", JSON.stringify(importantWordsArray, null, 2));
}

processTranscription().catch(console.error);