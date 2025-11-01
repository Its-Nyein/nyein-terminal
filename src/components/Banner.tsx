import { useEffect, useState } from "react";
import { banner } from "../utils/commands";
import { getPrompt } from "../utils/fetch";
import "../styles/styles.css";
import "../styles/theme.css";

export function Banner() {
  const bannerText = banner();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    getPrompt().then(setPrompt);
  }, []);

  return (
    <>
      <p className="inline">{prompt}</p>
      <p style={{ display: "inline", padding: "2px" }}>help</p>

      <pre>
        <div
          className="output"
          dangerouslySetInnerHTML={{ __html: bannerText }}
        ></div>
      </pre>
    </>
  );
}
