import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "jarvis-memory.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.prepare(`
  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`).run();

export function remember(type, key, value) {
  const now = new Date().toISOString();

  const existing = db
    .prepare("SELECT id FROM memories WHERE type = ? AND key = ?")
    .get(type, key);

  if (existing) {
    db.prepare(`
      UPDATE memories
      SET value = ?, updated_at = ?
      WHERE type = ? AND key = ?
    `).run(value, now, type, key);

    return { success: true, action: "updated" };
  }

  db.prepare(`
    INSERT INTO memories (type, key, value, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(type, key, value, now, now);

  return { success: true, action: "created" };
}

export function recall(key) {
  return db
    .prepare("SELECT * FROM memories WHERE key = ? ORDER BY updated_at DESC")
    .all(key);
}

export function recallAll() {
  return db
    .prepare("SELECT * FROM memories ORDER BY updated_at DESC")
    .all();
}

export function forget(key) {
  const result = db.prepare("DELETE FROM memories WHERE key = ?").run(key);
  return { success: true, deleted: result.changes };
}