import { command } from "./commands";

export async function handleGeneralCommands(
  value: string,
  setOut: (output: string) => void,
  setPrompts: (updater: ((prev: number) => number) | number) => void,
  updateHistory: (updater: (hist: string[]) => string[]) => void,
  history: string[],
  nextTheme: () => void
): Promise<void> {
  const sanitized = value.trim().replace(/</g, "<").replace(/>/g, ">");
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
    case "theme":
    case "t":
    case "wal": {
      nextTheme();
      const theme = document.documentElement.className || "default";
      setOut(`Theme changed to: <b class="grn">${theme}</b>`);
      break;
    }
    default: {
      const result = await command(cmd, args);
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
