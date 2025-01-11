import { useEffect, useState } from "react";
import { type FormProps } from "react-router-dom";
import { type users } from "../../schema";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";

export function Home(): JSX.Element {
  const [names, setNames] = useState<(typeof users.$inferSelect)["name"][]>([]);

  const updateNames = async (): Promise<void> => {
    const users = await window.ipcRenderer.invoke("fetchUsers");
    setNames(users.map((user) => user.name));
  };

  useEffect(() => {
    const asyncEffect = async (): Promise<void> => {
      await updateNames();
    };
    asyncEffect().catch(console.error);
  }, []);

  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const asyncSubmit = async (): Promise<void> => {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      await window.ipcRenderer.invoke("saveName", data.name.toString());
      await updateNames();
    };
    asyncSubmit().catch(console.error);
  };

  return (
    <div>
      <img alt="logo" src="vite.svg" />
      <h1>Hello, world!</h1>
      <div>
        <a href="#about">Go to about page</a>
      </div>
      <form onSubmit={handleSubmit}>
        <Input name="name" type="text" />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
      <div>
        {names.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    </div>
  );
}
