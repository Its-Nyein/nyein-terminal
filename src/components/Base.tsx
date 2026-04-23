import { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { Prompt } from "./Prompt";
import { loadAliases } from "../utils/aliases";
import { loadConfig } from "../utils/fetch";
import { initFilesystem } from "../utils/filesystem";

export function Base() {
  const [prompts, setPrompts] = useState<number>(1);
  const [history, setHistory] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    loadAliases();
    loadConfig().then((config) => {
      if (config) initFilesystem(config);
      setReady(true);
    });
  }, []);

  const updateHistory = (updater: (hist: string[]) => string[]) => {
    setHistory(updater);
  };

  const setPromptsWrapper = (updater: ((prev: number) => number) | number) => {
    if (typeof updater === "function") {
      setPrompts(updater);
    } else {
      setPrompts(updater);
      if (updater === 0) {
        setShowBanner(false);
        setTimeout(() => {
          setPrompts(1);
        }, 0);
      }
    }
  };

  const promptList = Array.from({ length: prompts }, (_, i) => i);

  if (!ready) return null;

  return (
    <div>
      {showBanner && <Banner />}
      {promptList.map((_, index) => (
        <Prompt
          key={index}
          setPrompts={setPromptsWrapper}
          updateHistory={updateHistory}
          history={history}
        />
      ))}
    </div>
  );
}
