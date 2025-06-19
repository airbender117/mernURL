import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Shorten() {
  const [longLink, setLongLink] = useState("");
  const [shortId, setShortId] = useState(null);
  const navigate = useNavigate();

  async function handleLongLink(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longLink }),
      });
      const data = await response.json();
      
      setShortId(data.shortId);

      if (response.ok) {
        alert("Short URL created: " + data.shortId);
        console.log(`localhost:9090/redirect/${data.shortId}`)
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating short link:", error);
    }
  }

  return (
    <form onSubmit={handleLongLink}>
      <div>
        <input
          placeholder="Enter your long link"
          required
          name="longLink"
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
        />
      </div>
      <button type="submit">Create shortlink</button>
    </form>
  );
}
