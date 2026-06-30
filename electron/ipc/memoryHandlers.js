import { ipcMain } from "electron";
import {
  remember,
  recall,
  recallAll,
  forget,
} from "../database/memory.js";

export function registerMemoryHandlers() {
  ipcMain.handle("memory:remember", async (_event, payload) => {
    const { type, key, value } = payload;
    return remember(type, key, value);
  });

  ipcMain.handle("memory:recall", async (_event, key) => {
    return recall(key);
  });

  ipcMain.handle("memory:recallAll", async () => {
    return recallAll();
  });

  ipcMain.handle("memory:forget", async (_event, key) => {
    return forget(key);
  });
}