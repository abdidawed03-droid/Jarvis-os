import { rememberMemory } from "../services/memoryClient.js";

export function analyzeMemoryIntent(message) {
  const text = message.trim().toLowerCase();

  const rules = [
    {
      type: "preference",
      key: "favoriteCar",
      triggers: ["mein lieblingsauto ist", "mein lieblings auto ist"],
      extract: (msg) => msg.split("ist").pop().trim(),
    },
    {
      type: "preference",
      key: "favoriteFood",
      triggers: ["mein lieblingsessen ist", "mein lieblings essen ist"],
      extract: (msg) => msg.split("ist").pop().trim(),
    },
    {
      type: "person",
      key: "catName",
      triggers: ["meine katze heißt", "mein kater heißt"],
      extract: (msg) => msg.split("heißt").pop().trim(),
    },
    {
      type: "person",
      key: "dogName",
      triggers: ["mein hund heißt", "meine hündin heißt"],
      extract: (msg) => msg.split("heißt").pop().trim(),
    },
    {
      type: "business",
      key: "company",
      triggers: ["meine firma heißt", "meine firma ist"],
      extract: (msg) => msg.split("ist").pop().trim(),
    },
    {
      type: "family",
      key: "brothers",
      triggers: ["ich habe 2 brüder", "ich habe zwei brüder"],
      extract: (msg) => msg.split("brüder").pop().replace(/einer namens|einer heißt|und einer|und/g, ",").trim(),
    },
    {
      type: "family",
      key: "brotherName",
      triggers: ["mein bruder heißt", "mein bruder heisst"],
      extract: (msg) => msg.split(/heißt|heisst/).pop().trim(),
    },
  ];

  for (const rule of rules) {
    const matched = rule.triggers.some((trigger) => text.includes(trigger));

    if (matched) {
      return {
        shouldRemember: true,
        type: rule.type,
        key: rule.key,
        value: rule.extract(message),
      };
    }
  }

  return { shouldRemember: false };
}

export async function handleSmartMemory(message) {
  const result = analyzeMemoryIntent(message);

  if (!result.shouldRemember) return null;

  await rememberMemory(result.type, result.key, result.value);

  return `Gespeichert, Boss. Ich merke mir: ${result.value}.`;
}