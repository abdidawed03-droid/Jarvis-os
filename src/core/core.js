import { DecisionEngine } from "./DecisionEngine.js";

export class Core {
  static async process(message) {
    const decision = await DecisionEngine.process(message);

    return decision;
  }
}