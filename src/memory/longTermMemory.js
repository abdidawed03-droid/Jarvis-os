let longTermMemory = {
  facts: [],
};

export function rememberFact(fact) {
  if (!fact || longTermMemory.facts.includes(fact)) return;

  longTermMemory.facts.push(fact);
}

export function getLongTermMemory() {
  if (longTermMemory.facts.length === 0) {
    return "Noch keine langfristigen Erinnerungen gespeichert.";
  }

  return longTermMemory.facts.map((fact) => `- ${fact}`).join("\n");
}

export function clearLongTermMemory() {
  longTermMemory = {
    facts: [],
  };
}