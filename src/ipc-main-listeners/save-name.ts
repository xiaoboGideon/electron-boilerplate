import { type IpcMainListener } from ".";
import { users } from "@/schema";
import { db } from "@/utils/db";

export const saveName = (async (
  _: unknown,
  name: string,
): Promise<typeof users.$inferSelect> => {
  return db.insert(users).values({ name }).returning().get();
}) satisfies IpcMainListener;
