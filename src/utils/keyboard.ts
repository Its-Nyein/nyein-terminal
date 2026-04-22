import type React from "react";

export function useKeyboardHandlers(
  inputRef: React.RefObject<HTMLInputElement>,
  history: string[],
  historyIndex: number,
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  setPrompts: (updater: ((prev: number) => number) | number) => void,
  onCtrlC: () => void,
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
  suggestions: string[],
  selectedSuggestionIndex: number,
  setSelectedSuggestionIndex: React.Dispatch<React.SetStateAction<number>>,
) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input) return;

    // Ctrl+C — cancel current input, show new prompt
    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      e.preventDefault();
      onCtrlC();
      return;
    }

    // Ctrl+U — clear the line
    if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      input.value = "";
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
      return;
    }

    // Ctrl+L or Cmd+L — clear screen
    if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setPrompts(0);
      setPrompts((prev: number) => prev + 1);
      return;
    }

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

        if (suggestions.length === 0) {
          return;
        }

        let nextIndex;
        if (selectedSuggestionIndex === -1) {
          nextIndex = 0;
        } else {
          nextIndex = (selectedSuggestionIndex + 1) % suggestions.length;
        }

        setSelectedSuggestionIndex(nextIndex);
        input.value = suggestions[nextIndex];
        break;
      }
    }
  };

  return handleKeyDown;
}
