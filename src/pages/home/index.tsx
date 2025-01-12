import { useEffect, useRef, useState } from "react";
import { Link, type FormProps } from "react-router-dom";
import { type users } from "../../schema";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";

export function Home(): JSX.Element {
  const [usersState, setUsersState] = useState<(typeof users.$inferSelect)[]>(
    [],
  );
  const formRef = useRef<HTMLFormElement>(null);

  const updateUsers = async (): Promise<void> => {
    const users = await window.ipcRenderer.invoke("fetchUsers");
    setUsersState(users);
  };

  useEffect(function setInitialUsers() {
    const asyncEffect = async (): Promise<void> => {
      await updateUsers();
    };
    asyncEffect().catch(console.error);
  }, []);

  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const asyncSubmit = async (): Promise<void> => {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      await window.ipcRenderer.invoke("saveName", data.name.toString());
      await updateUsers();
    };

    asyncSubmit()
      .then(() => {
        formRef.current?.reset();
      })
      .catch(console.error);
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
