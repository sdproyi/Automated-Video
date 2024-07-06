import { Database } from "bun:sqlite";
import { summarizedScarpedText } from "./puppeteer";
import { getGroqChatCompletion } from "../../AI/typescript/groq";

async function GroqAIResult() {
	const scrapedText = await summarizedScarpedText("https://google.com");
	const prompt = `Take a moment to reflect on this text. As you read through it carefully, imagine you're about to share its key points with a friend over a casual lunch. Once you've grasped the main ideas, I'd like you to summarize them in your own words. Use everyday language, as if you're having a natural conversation. Feel free to express your thoughts and reactions as they come to you - maybe you found something surprising, or particularly interesting. Speak as if you're explaining it out loud, with natural pauses and emphasis where it feels right. Don't set the stage or add any extra comments - just begin with the core message, sharing the main points in a clear, engaging way that flows like a real conversation. ${scrapedText}`;
	const chatCompletion = await getGroqChatCompletion(prompt);
	return chatCompletion.choices[0]?.message?.content || "";
}

async function setupDatabase() {
	const db = new Database("../../db/main.sqlite", { create: true });

	db.query(`CREATE TABLE IF NOT EXISTS text2speech (
    id INTEGER PRIMARY KEY,
    text TEXT
  )`).run();

	return db;
}

async function run() {
	const db = await setupDatabase();
	const insert = db.prepare("INSERT INTO text2speech (text) VALUES ($text)");
	db.run("DELETE FROM text2speech");
	const summarizedText = await GroqAIResult();
	const result = insert.run({ $text: summarizedText });
	result;
	db.close();
}

run().catch(console.error);
