import { banner } from "../utils/commands";
import { buildPrompt } from "../utils/fetch";
import "../styles/styles.css";
import "../styles/theme.css";

function getLastLogin(): string {
  const STORAGE_KEY = "nyein-terminal-last-login";
  const previous = localStorage.getItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, new Date().toISOString());

  if (previous) {
    const date = new Date(previous);
    return `Last login: ${date.toDateString()} ${date.toLocaleTimeString()} on ttys001`;
  }
  return "Welcome! This is your first visit.";
}

export function Banner() {
  const bannerText = banner();
  const prompt = buildPrompt();
  const lastLogin = getLastLogin();

  return (
    <>
      <div style={{ marginBottom: "8px", opacity: 0.6 }}>{lastLogin}</div>
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
