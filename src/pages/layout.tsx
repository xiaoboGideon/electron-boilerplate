import { Outlet } from "react-router-dom";

export function Layout(): React.JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  );
}
