import {
  rememberMemory,
  recallMemory,
  recallAllMemory,
} from "../services/memoryClient.js";

import { handleSmartMemory } from "../memory/memoryManager.js";
import { searchMemoryForAnswer } from "../memory/memorySearch.js";

export class MemoryEngine {

  static async handle(message) {

    // 1. Prüfen, ob neue Information gespeichert werden soll
    const saveResult = await handleSmartMemory(message);

    if (saveResult) {
      return saveResult;
    }

    // 2. Prüfen, ob die Antwort bereits im Langzeitgedächtnis existiert
    const memoryAnswer = await searchMemoryForAnswer(message);

    if (memoryAnswer) {
      return memoryAnswer;
    }

    // 3. Memory konnte nichts erledigen
    return null;
  }

  static async remember(type, key, value) {
    return rememberMemory(type, key, value);
  }

  static async recall(key) {
    return recallMemory(key);
  }

  static async recallAll() {
    return recallAllMemory();
  }
}