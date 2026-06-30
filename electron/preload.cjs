const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("jarvisMemory", {
  remember: (type, key, value) =>
    ipcRenderer.invoke("memory:remember", { type, key, value }),

  recall: (key) =>
    ipcRenderer.invoke("memory:recall", key),

  recallAll: () =>
    ipcRenderer.invoke("memory:recallAll"),

  forget: (key) =>
    ipcRenderer.invoke("memory:forget", key),
});