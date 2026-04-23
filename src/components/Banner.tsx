import { useEffect, useRef, useState } from "react";
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

function splitBannerLines(html: string): string[] {
  // Split on newlines but keep HTML blocks (like <pre>...</pre>) intact
  const lines: string[] = [];
  let buffer = "";
  let inPre = false;

  for (const line of html.split("\n")) {
    if (line.includes("<pre")) inPre = true;
    buffer += (buffer ? "\n" : "") + line;
    if (line.includes("</pre>")) {
      inPre = false;
      lines.push(buffer);
      buffer = "";
    } else if (!inPre) {
      lines.push(buffer);
      buffer = "";
    }
  }
  if (buffer) lines.push(buffer);
  return lines;
}

const LINE_DELAY = 30;

export function Banner() {
  const bannerText = banner();
  const prompt = buildPrompt();
  const lastLogin = getLastLogin();

  const lines = useRef(splitBannerLines(bannerText));
  const [visibleCount, setVisibleCount] = useState(0);
  const done = visibleCount >= lines.current.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, LINE_DELAY);
    return () => clearTimeout(timer);
  }, [visibleCount, done]);

  const visibleHtml = lines.current.slice(0, visibleCount).join("\n");

  return (
    <>
      <div style={{ marginBottom: "8px", opacity: 0.6 }}>{lastLogin}</div>
      <p className="inline">{prompt}</p>
      <p style={{ display: "inline", padding: "2px" }}>help</p>

      <pre>
        <div
          className="output"
          dangerouslySetInnerHTML={{ __html: visibleHtml }}
        ></div>
      </pre>
    </>
  );
}
