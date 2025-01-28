import path from "path";
import { existsSync, mkdirSync } from "fs";
import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";

const isDev = process.env.NODE_ENV === "development";
const baseResourcePath = isDev ? "." : process.resourcesPath;
const dbDirectoryPath = path.resolve(baseResourcePath, "database");

export const db = ((): BetterSQLite3Database => {
  try {
    if (!existsSync(dbDirectoryPath)) {
      mkdirSync(dbDirectoryPath, { recursive: true });
    }

    const dbPath = path.resolve(dbDirectoryPath, "app.db");
    const betterSqlite3 = new Database(dbPath, {
      verbose: isDev ? console.info : undefined,
    });
    betterSqlite3.pragma("journal_mode = WAL");

    return drizzle(betterSqlite3);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw new Error("Database initialization failed");
  }
})();
