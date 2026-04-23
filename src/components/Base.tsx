import { useCallback, useEffect, useState } from "react";
import { TabBar } from "./TabBar";
import { Terminal } from "./Terminal";
import { loadAliases } from "../utils/aliases";
import { loadConfig } from "../utils/fetch";
import { initFilesystem, removeTab, setActiveTab } from "../utils/filesystem";

interface Tab {
  id: string;
  title: string;
}

export function Base() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "tab-1", title: "terminal 1" },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>("tab-1");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    loadAliases();
    loadConfig().then((config) => {
      if (config) initFilesystem(config);
      setReady(true);
    });
  }, []);

  const handleSelectTab = useCallback((id: string) => {
    setActiveTab(id);
    setActiveTabId(id);
  }, []);

  const handleNewTab = useCallback(() => {
    setTabs((prev) => {
      // Find the next available number
      const existing = prev.map((t) => {
        const match = t.id.match(/^tab-(\d+)$/);
        return match ? parseInt(match[1]) : 0;
      });
      const next = Math.max(...existing) + 1;
      const tab: Tab = { id: `tab-${next}`, title: `terminal ${next}` };
      setActiveTab(tab.id);
      setActiveTabId(tab.id);
      return [...prev, tab];
    });
  }, []);

  const handleCloseTab = useCallback(
    (id: string) => {
      setTabs((prev) => {
        if (prev.length <= 1) return prev;
        const filtered = prev.filter((t) => t.id !== id);
        if (activeTabId === id) {
          const closedIndex = prev.findIndex((t) => t.id === id);
          const newActive =
            filtered[Math.min(closedIndex, filtered.length - 1)];
          setActiveTab(newActive.id);
          setActiveTabId(newActive.id);
        }
        removeTab(id);
        return filtered;
      });
    },
    [activeTabId],
  );

  if (!ready) return null;

  return (
    <div className="terminal-container">
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onNewTab={handleNewTab}
        onCloseTab={handleCloseTab}
      />
      <div className="terminal-content">
        {tabs.map((tab) => (
          <Terminal key={tab.id} isActive={tab.id === activeTabId} />
        ))}
      </div>
    </div>
  );
}
