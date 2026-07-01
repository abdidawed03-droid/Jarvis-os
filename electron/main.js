import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import OpenAI from "openai";
import { registerMemoryHandlers } from "./ipc/memoryHandlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.setName("JARVIS OS");

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

  return line.split("=").slice(1).join("=").trim();
}

function registerOpenAIHandler() {
  ipcMain.handle("openai:ask", async (_event, payload) => {
    const client = new OpenAI({
      apiKey: loadEnvKey(),
    });

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: payload.messages,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    backgroundColor: "#050816",
    autoHideMenuBar: true,
    title: "JARVIS OS",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  registerMemoryHandlers();
  registerOpenAIHandler();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});