import { use } from "react";
import { type users } from "@/schema";

interface Props {
  promiseUsers: Promise<(typeof users.$inferSelect)[]>;
}

export function UserList({ promiseUsers }: Props): React.JSX.Element {
  const users = use(promiseUsers);

  return (
    <div>
      <h2>Users:</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
