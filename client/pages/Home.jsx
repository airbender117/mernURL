import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [shortId, setShortId] = useState("");

const handleShortIdInput = (e) => {
  e.preventDefault();

  if (!shortId) return alert("Please enter a short ID");

  // Redirect browser to backend, which will perform the real redirect
  window.location.href = `http://localhost:9090/redirect/${shortId}`;
};


  return (
    <>
      <form onSubmit={handleShortIdInput}>
        <div>
          <label>Short ID</label>
          <br />
          <input
            placeholder="Enter your short id here"
            type="text"
            required
            value={shortId}
            name="shortId"
            onChange={(e) => setShortId(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Enter</button>
        </div>
      </form>

      <div>
        <Link to="/login">
          <button>Go to login page</button>
        </Link>
      </div>
    </>
  );
}
