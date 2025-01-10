import path from "path";
import { existsSync, mkdirSync } from "fs";
import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";

const isDev = process.env.NODE_ENV === "development";

const baseResourcePath = isDev ? "." : process.resourcesPath || ".";

const dbDirectoryPath = path.resolve(baseResourcePath, "database");
const dbPath = path.resolve(dbDirectoryPath, "app.db");

// 開発・本番環境共通でディレクトリの存在確認と作成
try {
  if (!existsSync(dbDirectoryPath)) {
    mkdirSync(dbDirectoryPath, { recursive: true });
  }
} catch (error) {
  console.error("Failed to create database directory:", error);
  throw new Error("Failed to initialize database directory");
}

// データベース接続の初期化
let betterSqlite3: Database.Database;
try {
  betterSqlite3 = new Database(dbPath, {
    verbose: isDev ? console.info : undefined,
  });

  betterSqlite3.pragma("journal_mode = WAL");
} catch (error) {
  console.error("Failed to initialize database:", error);
  throw new Error("Database initialization failed");
}

export const db: BetterSQLite3Database = drizzle(betterSqlite3);
