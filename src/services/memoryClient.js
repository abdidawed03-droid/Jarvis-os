export async function rememberMemory(type, key, value) {
  if (!window.jarvisMemory) {
    throw new Error("JARVIS Memory API nicht verfügbar.");
  }

  return await window.jarvisMemory.remember(type, key, value);
}

export async function recallMemory(key) {
  if (!window.jarvisMemory) {
    throw new Error("JARVIS Memory API nicht verfügbar.");
  }

  return await window.jarvisMemory.recall(key);
}

export async function recallAllMemory() {
  if (!window.jarvisMemory) {
    throw new Error("JARVIS Memory API nicht verfügbar.");
  }

  return await window.jarvisMemory.recallAll();
}

export async function forgetMemory(key) {
  if (!window.jarvisMemory) {
    throw new Error("JARVIS Memory API nicht verfügbar.");
  }

  return await window.jarvisMemory.forget(key);
}