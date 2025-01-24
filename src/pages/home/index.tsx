import { cache, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { UserList } from "./user-list";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { getErrorMessage } from "@/utils/get-error-message";
import { type users } from "@/schema";

const fetchUsers = cache(async () => window.ipcRenderer.invoke("fetchUsers"));

export function Home(): React.JSX.Element {
  const [promiseUsers, setPromiseUsers] =
    useState<Promise<(typeof users.$inferSelect)[]>>(fetchUsers);

  const handleSubmit = (formData: FormData): void => {
    try {
      const name = formData.get("name");
      if (typeof name !== "string") throw new Error("Name is not a string");
      const promiseRegisteredUser = window.ipcRenderer.invoke(
        "registerUser",
        name,
      );
      setPromiseUsers((promisePrevUsers) =>
        Promise.all([promisePrevUsers, promiseRegisteredUser]).then(
          ([prevUsers, registeredUser]) => [...prevUsers, registeredUser],
        ),
      );
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
        <label htmlFor="name">Name:</label>
        <Input name="name" type="text" id="name" />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
      <Suspense fallback={<p>Loading...</p>}>
        <UserList promiseUsers={promiseUsers} />
      </Suspense>
    </div>
  );
}
