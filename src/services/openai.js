import OpenAI from "openai";

import { buildSystemPrompt } from "../ai/promptBuilder";
import {
  addMessage,
  getConversationHistory,
} from "../ai/conversation";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askJarvis(message) {

  addMessage("user", message);

  const messages = [
    {
      role: "system",
      content: buildSystemPrompt(),
    },

    ...getConversationHistory(),
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    messages,

    temperature: 0.7,
  });

  const answer = response.choices[0].message.content;

  addMessage("assistant", answer);

  return answer;
}