import { buildSystemPrompt } from "../ai/promptBuilder.js";
import {
  addMessage,
  getConversationHistory,
} from "../ai/conversation.js";

export async function askJarvis(message) {
  addMessage("user", message);

  const messages = [
    {
      role: "system",
      content: buildSystemPrompt(),
    },
    ...getConversationHistory(),
  ];

  if (!window.jarvisAI) {
    throw new Error("JARVIS AI API nicht verfügbar.");
  }

  const answer = await window.jarvisAI.ask(messages);

  addMessage("assistant", answer);

  return answer;
}