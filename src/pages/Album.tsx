import { Link } from "react-router-dom";

export default function Album() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Album</h1>
      <p>This is the album page, navigated from the Hello World homepage.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
