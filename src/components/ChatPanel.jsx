import { useState } from "react";
import { dispatchCommand } from "../engine/dispatcher";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("Willkommen zurück, Boss.");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      setAnswer("JARVIS denkt...");

      const reply = await dispatchCommand(input);

      setAnswer(reply);
      setInput("");
    } catch (error) {
      console.error(error);
      setAnswer("Verbindung zur KI fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="voice-panel">

      <div className="voice-wave"></div>

      <strong>
        {loading ? "THINKING..." : "LISTENING..."}
      </strong>

      <div className="jarvis-chat">

        <p>{answer}</p>

        <div className="chat-controls">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Frag JARVIS..."
          />

          <button
            onClick={sendMessage}
            disabled={loading}
          >
            SEND
          </button>

        </div>

      </div>

    </div>
  );
}