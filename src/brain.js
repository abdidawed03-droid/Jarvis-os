import { askJarvis } from "./services/openai.js";
import {
  rememberMemory,
  recallMemory,
  recallAllMemory,
} from "./services/memoryClient.js";

export async function processCommand(message) {
  const text = message.trim().toLowerCase();

  if (!text) return "Boss, ich habe keinen Befehl erkannt.";

  if (
    text.includes("mein lieblingsauto ist") ||
    text.includes("mein lieblings auto ist") ||
    text.includes("mein favorite car ist")
  ) {
    const value = message.split("ist").pop().trim();

    await rememberMemory("preference", "favoriteCar", value);

    return `Gespeichert, Boss. Dein Lieblingsauto ist ${value}.`;
  }

  if (
    text.includes("was ist mein lieblingsauto") ||
    text.includes("was ist mein lieblings auto") ||
    text.includes("lieblingsauto")
  ) {
    const memories = await recallMemory("favoriteCar");

    if (memories && memories.length > 0) {
      return `Dein Lieblingsauto ist ${memories[0].value}, Boss.`;
    }

    return "Dazu habe ich noch keine Erinnerung gespeichert, Boss.";
  }

  if (
    text === "memory" ||
    text.includes("was weißt du über mich")
  ) {
    const memories = await recallAllMemory();

    if (!memories || memories.length === 0) {
      return "Ich habe noch keine langfristigen Erinnerungen gespeichert, Boss.";
    }

    return memories
      .map((memory) => `- ${memory.key}: ${memory.value}`)
      .join("\n");
  }

  if (text.includes("uhr") || text.includes("uhrzeit")) {
    return `Es ist ${new Date().toLocaleTimeString("de-CH")}, Boss.`;
  }

  if (text.includes("datum") || text.includes("welcher tag")) {
    return `Heute ist ${new Date().toLocaleDateString("de-CH")}, Boss.`;
  }

  return await askJarvis(message);
}