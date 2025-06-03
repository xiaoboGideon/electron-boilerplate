import { use } from "react";
import type { users } from "@/schema";

interface Props {
  usersPromise: Promise<(typeof users.$inferSelect)[]>;
}

export function UserList({ usersPromise }: Props): React.JSX.Element {
  const users = use(usersPromise);

  return (
    <div>
      <h2>Users:</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
