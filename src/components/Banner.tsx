import { banner } from "../utils/commands";
import { buildPrompt } from "../utils/fetch";
import "../styles/styles.css";
import "../styles/theme.css";

export function Banner() {
  const bannerText = banner();
  const prompt = buildPrompt();

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
