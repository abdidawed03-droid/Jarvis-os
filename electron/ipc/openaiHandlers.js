import { ipcMain } from "electron";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

function loadEnvKey() {
  const envPath = path.join(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(`.env Datei nicht gefunden: ${envPath}`);
  }

  const env = fs.readFileSync(envPath, "utf8");

  const line = env
    .split("\n")
    .find(
      (l) =>
        l.trim().startsWith("OPENAI_API_KEY=") ||
        l.trim().startsWith("VITE_OPENAI_API_KEY=")
    );

  if (!line) {
    throw new Error("Kein OpenAI API Key in .env gefunden.");
  }

  const key = line.split("=").slice(1).join("=").trim();

  if (!key) {
    throw new Error("OpenAI API Key ist leer.");
  }

  return key;
}

export function registerOpenAIHandlers() {
  ipcMain.handle("openai:ask", async (_event, payload) => {
    try {
      const client = new OpenAI({
        apiKey: loadEnvKey(),
      });

      const { messages } = payload;

      const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("JARVIS OpenAI Fehler:", error);
      throw error;
    }
  });
}