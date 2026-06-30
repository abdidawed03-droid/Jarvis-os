import { processCommand } from "../brain";

export async function dispatchCommand(message) {
  const text = message.trim().toLowerCase();

  if (!text) {
    return "Boss, ich habe keinen Befehl erkannt.";
  }

  if (text.includes("hilfe") || text.includes("was kannst du")) {
    return `
Ich bin bereit, Boss.

Aktuell kann ich:
- mit dir schreiben
- einfache Befehle erkennen
- Uhrzeit und Datum beantworten
- mit OpenAI antworten
- Memory-System vorbereiten

Als Nächstes baue ich:
- dauerhaftes Gedächtnis
- Sprache
- Wetter
- Spotify
- Smart Home
- Venom Cars
`;
  }

  return await processCommand(message);
}