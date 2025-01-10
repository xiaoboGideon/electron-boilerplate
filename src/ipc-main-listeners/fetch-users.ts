import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const fetchUsers = (async (): Promise<(typeof users.$inferSelect)[]> => {
  return await db.select().from(users);
}) satisfies IpcMainListener;
