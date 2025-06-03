import type { IpcMainListener } from ".";
import { users } from "@/schema";
import { db } from "@/utils/db";

export const fetchUsers = ((): Promise<(typeof users.$inferSelect)[]> => {
  return db.select().from(users);
}) satisfies IpcMainListener;
