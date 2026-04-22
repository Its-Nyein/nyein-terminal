import { command } from "./commands";
import { loadConfig } from "./fetch";
import { getCwd } from "./filesystem";
import { setThemeByName, THEMES } from "./themes";

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function applyGrep(input: string, pattern: string): string {
  const lines = input.split("\n");
  const flags = pattern.startsWith("-i ") ? "i" : "";
  const searchTerm = flags ? pattern.slice(3).trim() : pattern.trim();

  if (!searchTerm) return input;

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    flags ? "gi" : "g",
  );

  return lines
    .filter((line) => regex.test(line))
    .map((line) => line.replace(regex, `<span class="rd semibold">$1</span>`))
    .join("\n");
}

function expandEnvVars(text: string): string {
  const config = configCacheRef;
  const theme = document.documentElement.className || "default";

  const vars: Record<string, string> = {
    USER: config?.username || "user",
    HOME: "~",
    SHELL: "/bin/bash",
    TERM: "nyein-terminal",
    THEME: theme,
    PWD: getCwd(),
    HOSTNAME: "portfolio",
    EDITOR: "vim",
    LANG: "en_US.UTF-8",
  };

  return text.replace(/\$([A-Z_][A-Z0-9_]*)/g, (_match, name) => {
    return vars[name] ?? "";
  });
}

let configCacheRef: { username: string } | null = null;

export async function handleGeneralCommands(
  value: string,
  setOut: (output: string) => void,
  setPrompts: (updater: ((prev: number) => number) | number) => void,
  updateHistory: (updater: (hist: string[]) => string[]) => void,
  history: string[],
  nextTheme: () => void,
): Promise<void> {
  const sanitized = value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Cache config ref for env var expansion
  if (!configCacheRef) {
    const config = await loadConfig();
    if (config) configCacheRef = config;
  }

  // Check for pipe
  const pipeIndex = sanitized.indexOf(" | ");
  if (pipeIndex !== -1) {
    const leftRaw = sanitized.slice(0, pipeIndex).trim();
    const rightRaw = sanitized.slice(pipeIndex + 3).trim();
    const [rightCmd, ...rightRest] = rightRaw.split(" ");
    const rightArgs = rightRest.join(" ");

    // Execute left side to get output
    const leftOutput = await executeCommand(
      leftRaw,
      history,
      nextTheme,
      setPrompts,
    );

    if (rightCmd === "grep" && rightArgs) {
      const plainText = stripHtml(leftOutput);
      const grepResult = applyGrep(plainText, rightArgs);
      setOut(grepResult || "");
    } else {
      setOut(`pipe: unsupported command: ${rightCmd}`);
    }

    updateHistory((hist) => {
      if (sanitized.length > 0 && hist[0] !== sanitized) {
        const newHist = [sanitized, ...hist];
        if (newHist.length > 20) newHist.pop();
        return newHist;
      }
      return hist;
    });

    setPrompts((prev: number) => {
      const next = prev + 1;
      return next >= 255 ? 0 : next;
    });
    return;
  }

  const [cmd, ...rest] = sanitized.split(" ");
  const args = rest.join(" ");

  switch (cmd) {
    case "clear": {
      setPrompts(0);
      return;
    }
    case "history": {
      const hist = [...history].reverse();
      const histString = hist.map((c, i) => `${i + 1} ${c}`).join("\n");
      setOut(histString);
      break;
    }
    case "theme": {
      if (args.trim() === "") {
        setOut(
          `Themes: ${THEMES.join(", ")}\nUsage: theme set &lt;theme-name&gt;\n\neg: theme set nord`,
        );
      } else {
        const [subCmd, themeName] = args.trim().split(/\s+/);
        if (subCmd === "set" && themeName) {
          const theme = setThemeByName(themeName);
          if (theme) {
            setOut(`Theme set to: <b class="grn">${theme}</b>`);
          } else {
            const availableThemes = THEMES.join(", ");
            setOut(
              `<span class="rd">Invalid theme: ${themeName}</span>\nAvailable themes: ${availableThemes}`,
            );
          }
        } else {
          setOut(`Usage: theme set &lt;theme-name&gt;\n\neg: theme set nord`);
        }
      }
      break;
    }
    case "t":
    case "wal": {
      nextTheme();
      const theme = document.documentElement.className || "default";
      setOut(`Theme changed to: <b class="grn">${theme}</b>`);
      break;
    }
    default: {
      let result = await command(cmd, args);
      if (result.startsWith("__ENV_EXPAND__")) {
        result = expandEnvVars(result.slice(14));
      }
      setOut(result);
      break;
    }
  }

  updateHistory((hist) => {
    if (sanitized.length > 0 && hist[0] !== sanitized) {
      const newHist = [sanitized, ...hist];
      if (newHist.length > 20) {
        newHist.pop();
      }
      return newHist;
    }
    return hist;
  });

  setPrompts((prev: number) => {
    const next = prev + 1;
    return next >= 255 ? 0 : next;
  });
}

async function executeCommand(
  input: string,
  history: string[],
  nextTheme: () => void,
  setPrompts: (updater: ((prev: number) => number) | number) => void,
): Promise<string> {
  const [cmd, ...rest] = input.split(" ");
  const args = rest.join(" ");

  switch (cmd) {
    case "history": {
      const hist = [...history].reverse();
      return hist.map((c, i) => `${i + 1} ${c}`).join("\n");
    }
    case "theme":
      return `Themes: ${THEMES.join(", ")}`;
    case "t":
    case "wal": {
      nextTheme();
      const theme = document.documentElement.className || "default";
      return `Theme changed to: ${theme}`;
    }
    case "clear":
      setPrompts(0);
      return "";
    default: {
      let result = await command(cmd, args);
      if (result.startsWith("__ENV_EXPAND__")) {
        result = expandEnvVars(result.slice(14));
      }
      return result;
    }
  }
}
