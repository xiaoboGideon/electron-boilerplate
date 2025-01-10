import { useEffect, useState } from "react";
import {
  Form,
  TextField,
  ButtonGroup,
  Button,
  Flex,
} from "@adobe/react-spectrum";
import { type FormProps } from "react-router-dom";
import { users } from "../../schema";

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
      <Flex gap="size-400" justifyContent="center" marginTop="size-400">
        <Flex direction="column" gap="size-200">
          <Form maxWidth="size-3000" onSubmit={handleSubmit}>
            <TextField label="Save name" name="name" />
            <ButtonGroup>
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </ButtonGroup>
          </Form>
        </Flex>
        <div>
          {names.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
      </Flex>
    </div>
  );
}
