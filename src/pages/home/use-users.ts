import { useState, useCallback, startTransition } from "react";
import type { users } from "@/schema";

type User = typeof users.$inferSelect;

interface UseUsersReturn {
  usersPromise: Promise<User[]>;
  registerUser: (name: string) => Promise<void>;
  deleteAllUsers: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [usersPromise, setUsersPromise] = useState<Promise<User[]>>(
    window.ipcRenderer.invoke("fetchUsers"),
  );

  const handleRegisterUser = useCallback(
    async (name: string): Promise<void> => {
      const newUsersPromise = (async (): Promise<User[]> => {
        const [currentUsers, newUser] = await Promise.all([
          usersPromise,
          window.ipcRenderer.invoke("registerUser", name),
        ]);
        return [...currentUsers, newUser];
      })();

      // Use React 19's startTransition to handle non-urgent updates
      startTransition(() => {
        setUsersPromise(newUsersPromise);
      });

      // Wait for the new users promise to resolve
      await newUsersPromise;
    },
    [usersPromise],
  );

  const handleDeleteAllUsers = useCallback(async (): Promise<void> => {
    await window.ipcRenderer.invoke("deleteUsers");

    // Update the usersPromise to an empty array
    startTransition(() => {
      setUsersPromise(Promise.resolve([]));
    });
  }, []);

  return {
    usersPromise,
    registerUser: handleRegisterUser,
    deleteAllUsers: handleDeleteAllUsers,
  };
}
