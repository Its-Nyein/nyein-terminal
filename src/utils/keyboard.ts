import type React from "react";
import { autoComplete } from "./commands";

export function useKeyboardHandlers(
  inputRef: React.RefObject<HTMLInputElement>,
  history: string[],
  historyIndex: number,
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  setPrompts: (updater: ((prev: number) => number) | number) => void,
) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input) return;

    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        if (historyIndex < history.length) {
          input.value = history[historyIndex];
          setHistoryIndex((prev) => prev + 1);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (historyIndex > 1) {
          input.value = history[historyIndex - 2];
          setHistoryIndex((prev) => prev - 1);
        } else if (historyIndex === 1) {
          input.value = "";
          setHistoryIndex((prev) => prev - 1);
        }
        break;
      }
      case "Tab": {
        e.preventDefault();
        input.value = autoComplete(input.value);
        break;
      }
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setPrompts(0);
      setPrompts((prev: number) => prev + 1);
    }
  };

  return handleKeyDown;
}
