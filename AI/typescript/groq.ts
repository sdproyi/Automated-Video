import Groq from "groq-sdk";

const groq = new Groq({ apiKey: Bun.env.GROQ_API_KEY});

export async function main() {
  const chatCompletion = await getGroqChatCompletion("");
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(text:string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    model: "llama3-70b-8192",
  });
}
