import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { type users } from "../../schema";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { getErrorMessage } from "@/utils/get-error-message";

export function Home(): React.JSX.Element {
  const [usersState, setUsersState] = useState<(typeof users.$inferSelect)[]>(
    [],
  );
  const formRef = useRef<HTMLFormElement>(null);

  const updateUsers = async (): Promise<void> => {
    const users = await window.ipcRenderer.invoke("fetchUsers");
    setUsersState(users);
  };

  useEffect(function setInitialUsers() {
    void updateUsers();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.name || typeof data.name !== "string") return;

    try {
      const newUser = await window.ipcRenderer.invoke("saveName", data.name);
      setUsersState((prev) => [...prev, newUser]);
      formRef.current?.reset();
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
      <div>
        {usersState.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}
