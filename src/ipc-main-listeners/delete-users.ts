import { type IpcMainListener } from ".";
import { users } from "@/schema";
import { db } from "@/utils/db";

export const deleteUsers = (async (): Promise<void> => {
  await db.delete(users);
}) satisfies IpcMainListener;
