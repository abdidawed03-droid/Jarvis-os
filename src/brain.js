import { askJarvis } from "./services/openai.js";
import {
  recallMemory,
  recallAllMemory,
} from "./services/memoryClient.js";
import { handleSmartMemory } from "./memory/memoryManager.js";

export async function processCommand(message) {
  const text = message.trim().toLowerCase();

  if (!text) return "Boss, ich habe keinen Befehl erkannt.";

  // Smart Memory
  const memoryReply = await handleSmartMemory(message);
  if (memoryReply) return memoryReply;

  // Lieblingsauto
  if (text.includes("lieblingsauto")) {
    const memories = await recallMemory("favoriteCar");

    if (memories.length) {
      return `Dein Lieblingsauto ist ${memories[0].value}, Boss.`;
    }

    return "Ich kenne dein Lieblingsauto noch nicht, Boss.";
  }

  // Brüder
  if (
    text.includes("wie heißen meine brüder") ||
    text.includes("wie heissen meine brüder") ||
    text.includes("meine brüder")
  ) {
    const memories = await recallMemory("brothers");

    if (memories.length) {
      return `Deine Brüder sind ${memories[0].value}, Boss.`;
    }

    return "Ich kenne deine Brüder noch nicht, Boss.";
  }

  // Bruder
  if (
    text.includes("wie heißt mein bruder") ||
    text.includes("wie heisst mein bruder")
  ) {
    const memories = await recallMemory("brotherName");

    if (memories.length) {
      return `Dein Bruder heißt ${memories[0].value}, Boss.`;
    }

    return "Ich kenne den Namen deines Bruders noch nicht, Boss.";
  }

  // Katze
  if (text.includes("wie heißt meine katze")) {
    const memories = await recallMemory("catName");

    if (memories.length) {
      return `Deine Katze heißt ${memories[0].value}, Boss.`;
    }

    return "Ich kenne den Namen deiner Katze noch nicht, Boss.";
  }

  // Hund
  if (text.includes("wie heißt mein hund")) {
    const memories = await recallMemory("dogName");

    if (memories.length) {
      return `Dein Hund heißt ${memories[0].value}, Boss.`;
    }

    return "Ich kenne den Namen deines Hundes noch nicht, Boss.";
  }

  // Firma
  if (text.includes("wie heißt meine firma")) {
    const memories = await recallMemory("company");

    if (memories.length) {
      return `Deine Firma heißt ${memories[0].value}, Boss.`;
    }

    return "Ich kenne deine Firma noch nicht, Boss.";
  }

  // Memory anzeigen
  if (text === "memory" || text.includes("was weißt du über mich")) {
    const memories = await recallAllMemory();

    if (!memories.length) {
      return "Ich habe noch keine langfristigen Erinnerungen gespeichert, Boss.";
    }

    return memories
      .map((m) => `• ${m.key}: ${m.value}`)
      .join("\n");
  }

  return await askJarvis(message);
}