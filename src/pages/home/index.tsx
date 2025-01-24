import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { getErrorMessage } from "@/utils/get-error-message";
import { type users } from "@/schema";

export function Home(): React.JSX.Element {
  const [usersState, setUsersState] = useState<(typeof users.$inferSelect)[]>(
    [],
  );

  useEffect(function setInitialUsers() {
    void (async (): Promise<void> => {
      const users = await window.ipcRenderer.invoke("fetchUsers");
      setUsersState(users);
    })();
  }, []);

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      const name = formData.get("name");
      if (typeof name !== "string") throw new Error("Name is not a string");
      const registeredUser = await window.ipcRenderer.invoke(
        "registerUser",
        name,
      );
      setUsersState((prev) => [...prev, registeredUser]);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
    }
  };

  return (
    <div>
      <img alt="logo" src="vite.svg" />
      <h1>Hello, world!</h1>
      <div>
        <Link to="/about">Go to about page</Link>
      </div>
      <form action={handleSubmit}>
        <Input name="name" type="text" />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
      <div>
        <h2>Users:</h2>
        {usersState.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}
