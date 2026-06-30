let conversationHistory = [];

export function addMessage(role, content) {
  conversationHistory.push({
    role,
    content,
    time: new Date().toISOString(),
  });

  // Nur die letzten 10 Nachrichten behalten
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }
}

export function getConversationHistory() {
  return conversationHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}

export function clearConversation() {
  conversationHistory = [];
}
