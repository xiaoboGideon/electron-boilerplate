import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const saveName = (async (
  _: unknown,
  name: string,
): Promise<typeof users.$inferSelect> => {
  const result = db.insert(users).values({ name }).returning().get();
  return result;
}) satisfies IpcMainListener;
