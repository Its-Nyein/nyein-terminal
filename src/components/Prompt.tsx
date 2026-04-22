import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { buildPrompt } from "../utils/fetch";
import { handleGeneralCommands } from "../utils/general";
import { useKeyboardHandlers } from "../utils/keyboard";
import { useTheme } from "../utils/themes";
import { getMatchingCommands } from "../utils/commands";

interface PromptProps {
  setPrompts: (updater: ((prev: number) => number) | number) => void;
  updateHistory: (updater: (hist: string[]) => string[]) => void;
  history: string[];
}

export function Prompt({ setPrompts, updateHistory, history }: PromptProps) {
  const [out, setOut] = useState<string>("");
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [prompt] = useState<string>(() => buildPrompt());
  const [submittedCommand, setSubmittedCommand] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const [, nextTheme] = useTheme();

  useEffect(() => {
    const handleInput = () => {
      if (!inputRef.current || isSubmitted) return;
      const value = inputRef.current.value;
      const matches = getMatchingCommands(value);
      setSuggestions(matches);
      setSelectedSuggestionIndex(-1);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("input", handleInput);
      return () => {
        inputElement.removeEventListener("input", handleInput);
      };
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (inputRef.current && !isSubmitted) {
      inputRef.current.focus();
    }
  }, [isSubmitted]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !isSubmitted) {
        const target = e.target as HTMLElement;
        const tagName = target.tagName;
        const isInteractive =
          tagName === "INPUT" ||
          tagName === "BUTTON" ||
          tagName === "A" ||
          tagName === "SELECT" ||
          target.closest("a");

        if (!isInteractive) {
          setTimeout(() => {
            if (
              inputRef.current &&
              !isSubmitted &&
              document.activeElement !== inputRef.current
            ) {
              inputRef.current.focus();
            }
          }, 0);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isSubmitted]);

  const handleKeyDown = useKeyboardHandlers(
    inputRef,
    history,
    historyIndex,
    setHistoryIndex,
    setPrompts,
    null,
    null,
    suggestions,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input) return;

    const inputValue = input.value;
    const isEmpty = inputValue.trim() === "";

    setIsSubmitted(true);
    setSubmittedCommand(inputValue);

    if (formRef.current) {
      formRef.current.setAttribute("inert", "");
    }
    input.setAttribute("inert", "");

    if (isEmpty) {
      setOut("");
      setHistoryIndex(0);
      setPrompts((prev: number) => {
        const next = prev + 1;
        return next >= 255 ? 0 : next;
      });
      return;
    }

    await handleGeneralCommands(
      inputValue,
      setOut,
      setPrompts,
      updateHistory,
      history,
      nextTheme,
    );

    setHistoryIndex(0);
  };

  // Extract only the completable part for display (e.g., "about.txt" not "cat about.txt")
  const displaySuggestions = suggestions.map((s) => {
    const spaceIndex = s.indexOf(" ");
    return spaceIndex !== -1 ? s.slice(spaceIndex + 1) : s;
  });

  return (
    <div>
      <form id="prompt-form" onSubmit={onSubmit} ref={formRef}>
        <p className="inline">{prompt}</p>
        <input
          id="prompt-input"
          autoComplete="off"
          className="inp"
          type="text"
          maxLength={100}
          spellCheck={false}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={isSubmitted}
          defaultValue={isSubmitted ? submittedCommand : ""}
          readOnly={isSubmitted}
        />
      </form>
      {!isSubmitted && suggestions.length > 0 && (
        <div className="suggestions-container">
          {displaySuggestions.map((display, index) => (
            <span
              key={suggestions[index]}
              className={`suggestion-item ${index === selectedSuggestionIndex ? "selected" : ""}`}
            >
              {display}
            </span>
          ))}
        </div>
      )}
      {out && (
        <pre>
          <div
            className="output"
            dangerouslySetInnerHTML={{ __html: out }}
          ></div>
        </pre>
      )}
    </div>
  );
}
