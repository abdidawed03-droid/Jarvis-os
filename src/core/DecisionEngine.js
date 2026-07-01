import { MemoryEngine } from "./MemoryEngine.js";
import { SkillEngine } from "./SkillEngine.js";
import { SystemEngine } from "./SystemEngine.js";
import { AIEngine } from "./AIEngine.js";

export class DecisionEngine {
  static async process(message) {
    const text = message.trim().toLowerCase();

    if (!text) {
      return "Boss, ich habe keinen Befehl erkannt.";
    }

    const memoryResult = await MemoryEngine.handle(message);
    if (memoryResult) return memoryResult;

    const skillResult = await SkillEngine.execute(message);
    if (skillResult) return skillResult;

    const systemResult = await SystemEngine.execute(message);
    if (systemResult) return systemResult;

    return await AIEngine.ask(message);
  }
}