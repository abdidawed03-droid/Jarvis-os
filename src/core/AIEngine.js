import { askJarvis } from "../services/openai.js";

export class AIEngine {
  static async ask(message) {
    return await askJarvis(message);
  }
}