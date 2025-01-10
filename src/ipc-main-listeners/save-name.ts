import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const saveName = (async (_: unknown, name: string): Promise<void> => {
  await db.insert(users).values({ name });
}) satisfies IpcMainListener;
