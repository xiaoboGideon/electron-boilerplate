import { Link } from "react-router-dom";

export function About(): React.JSX.Element {
  return (
    <div>
      <h1>About</h1>
      <div>
        <Link to="/">Go to home page</Link>
      </div>
    </div>
  );
}
