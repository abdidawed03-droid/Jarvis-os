import { useEffect, useState } from "react";
import ChatPanel from "./components/ChatPanel.jsx";
import "./App.css";
const status = [
  ["◉", "CPU", "64%"],
  ["▣", "RAM", "48%"],
  ["⌁", "INTERNET", "ONLINE"],
  ["✺", "OPENAI", "ONLINE"],
  ["⚛", "QUANTUM ES2", "ONLINE"],
  ["◖", "MIKROFON", "ONLINE"],
  ["⌂", "HOME ASSISTANT", "ONLINE"],
];

const activity = [
  "SYSTEME STABIL",
  "VERBINDUNG SICHER",
  "KI-KERN BEREIT",
  "DATENBANK ONLINE",
  "QUANTUM LINK AKTIV",
  "SPRACHERKENNUNG AKTIV",
];

const logs = [
  ["15:47:01", "SYSTEM STARTUP", "SUCCESS"],
  ["15:47:05", "AI CORE CONNECTED", "SUCCESS"],
  ["15:47:10", "QUANTUM LINK", "ESTABLISHED"],
  ["15:47:21", "VOICE SYSTEM", "ONLINE"],
  ["15:47:28", "DATABASE SYNC", "COMPLETE"],
  ["15:47:30", "ALL SYSTEMS", "ONLINE"],
];

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("de-CH");
  const date = now.toLocaleDateString("de-CH", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="os">
      <header className="topbar">
        <div className="brand">
          JARVIS OS <span>v2.4.1</span>
        </div>

        <nav>
          <b>DASHBOARD</b>
          <span>SYSTEM</span>
          <span>APPLICATIONS</span>
          <span>AI CORE</span>
          <span>NETWORK</span>
          <span>SETTINGS</span>
        </nav>

        <div className="online">JARVIS ONLINE ●</div>
      </header>

      <section className="grid">
        <aside className="left">
          <Panel title="SYSTEM STATUS">
            {status.map(([icon, name, value]) => (
              <div className="status-row" key={name}>
                <i>{icon}</i>
                <span>{name}</span>
                <b>{value}</b>
              </div>
            ))}
          </Panel>

          <Panel title="AKTIVITÄT">
            {activity.map((item) => (
              <div className="activity-row" key={item}>
                <span>{item}</span>
                <b>✓</b>
              </div>
            ))}
          </Panel>

          <Panel title="NOTIZEN" className="notes">
            <p>
              Keine neuen
              <br />
              Benachrichtigungen
            </p>
          </Panel>
        </aside>

        <section className="center">
          <h1>JARVIS CORE</h1>

          <div className="reactor-area">
            <div className="grid-dots"></div>
            <div className="laser horizontal"></div>
            <div className="laser vertical"></div>

            <div className="reactor">
              <div className="outer-rays"></div>
              <div className="ring a"></div>
              <div className="ring b"></div>
              <div className="ring c"></div>
              <div className="ring d"></div>
              <div className="ring e"></div>
              <div className="tick-ring"></div>
              <div className="nodes"></div>
              <div className="core"></div>
            </div>
          </div>

          <div className="core-caption">
            <h2>ALLE SYSTEME ONLINE</h2>
            <p>KI-KERN AKTIVIERT</p>
          </div>

          <Panel title="SYSTEM PERFORMANCE" className="performance">
            {["CPU", "RAM", "NET", "GPU"].map((label, index) => (
              <div className="perf-row" key={label}>
                <span>{label}</span>
                <div className={`pulse-line p${index + 1}`}></div>
                <b>{[64, 48, 72, 36][index]}%</b>
              </div>
            ))}
          </Panel>

          <ChatPanel />
        </section>

        <aside className="right">
          <div className="top-cards">
            <div className="info">
              <div className="clock">{time}</div>
              <p>{date}</p>
            </div>

            <div className="info weather">
              <b>WETTER</b>
              <div>☁ 24°C</div>
              <p>LUZERN, SCHWEIZ</p>
              <p>LEICHT BEWÖLKT</p>
            </div>
          </div>

          <Panel title="LIVE FEED" className="live">
            <div className="world-map">
              <div className="world-shape"></div>
              <svg viewBox="0 0 620 260">
                <path d="M40 205 C120 40 280 60 570 130" />
                <path d="M100 210 C180 90 350 120 520 55" />
                <path d="M160 230 C280 155 400 150 585 220" />
                <path d="M70 170 C220 20 390 30 560 90" />
                <circle cx="82" cy="188" r="5" />
                <circle cx="190" cy="92" r="5" />
                <circle cx="315" cy="118" r="5" />
                <circle cx="460" cy="78" r="5" />
                <circle cx="565" cy="216" r="5" />
              </svg>

              <div className="feed-footer">
                <span>VERBINDUNGEN AKTIV</span>
                <b>128</b>
              </div>
            </div>
          </Panel>

          <Panel title="SYSTEM LOG">
            {logs.map(([timeLog, message, state]) => (
              <div className="log-row" key={message}>
                <span>{timeLog}</span>
                <span>{message}</span>
                <b>{state}</b>
              </div>
            ))}
          </Panel>

          <Panel title="QUICK ACCESS">
            <div className="quick">
              <button><span>▱</span><small>VENOM CARS</small></button>
              <button><span>▣</span><small>KALENDER</small></button>
              <button><span>☁</span><small>WETTER</small></button>
              <button><span>◉</span><small>SPOTIFY</small></button>
              <button><span>⌂</span><small>SMART HOME</small></button>
            </div>
          </Panel>
        </aside>
      </section>
    </main>
  );
}

function Panel({ title, children, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}