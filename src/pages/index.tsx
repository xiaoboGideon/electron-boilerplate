import "@/styles/globals.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from "./home";
import { ErrorBoundary } from "./error-boundary";
import { About } from "./about";
import { Layout } from "./layout";

// Since this is a client-only application, use `createHashRouter`
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
