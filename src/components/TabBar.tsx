interface Tab {
  id: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onNewTab: () => void;
  onCloseTab: (id: string) => void;
}

export function TabBar({
  tabs,
  activeTabId,
  onSelectTab,
  onNewTab,
  onCloseTab,
}: TabBarProps) {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-item ${tab.id === activeTabId ? "tab-active" : ""}`}
          onClick={() => onSelectTab(tab.id)}
        >
          <span className="tab-title">{tab.title}</span>
          {tabs.length > 1 && (
            <span
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
            >
              ×
            </span>
          )}
        </div>
      ))}
      <div className="tab-new" onClick={onNewTab}>
        +
      </div>
    </div>
  );
}
