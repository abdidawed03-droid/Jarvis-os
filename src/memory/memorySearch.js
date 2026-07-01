import { recallAllMemory } from "../services/memoryClient.js";

export async function searchMemoryForAnswer(question) {
  const text = question.trim().toLowerCase();
  const memories = await recallAllMemory();

  if (!memories || memories.length === 0) {
    return null;
  }

  const words = text
    .replace(/[?.,!]/g, "")
    .split(" ")
    .filter((word) => word.length > 3);

  const matches = memories.filter((memory) => {
    const combined = `${memory.type} ${memory.key} ${memory.value}`.toLowerCase();

    return words.some((word) => combined.includes(word));
  });

  if (matches.length === 0) {
    return null;
  }

  return matches
    .slice(0, 5)
    .map((memory) => `• ${memory.key}: ${memory.value}`)
    .join("\n");
}