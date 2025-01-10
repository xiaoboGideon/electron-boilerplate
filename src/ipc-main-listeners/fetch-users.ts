import { users } from "../schema";
import { db } from "../utils/db";
import { type IpcMainListener } from ".";

export const fetchUsers = (async (): Promise<(typeof users.$inferSelect)[]> => {
  db.insert(users)
    .values({ id: 1, name: "John Doe" })
    .onConflictDoNothing({ target: users.id })
    .run();

  return await db.select().from(users);
}) satisfies IpcMainListener;
