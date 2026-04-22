const STORAGE_KEY = "nyein-terminal-aliases";

let aliasMap: Record<string, string> = {};

export function loadAliases(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) aliasMap = JSON.parse(stored);
  } catch {
    aliasMap = {};
  }
}

function saveAliases(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(aliasMap));
}

export function getAlias(name: string): string | undefined {
  return aliasMap[name];
}

export function setAlias(name: string, value: string): void {
  aliasMap[name] = value;
  saveAliases();
}

export function removeAlias(name: string): boolean {
  if (name in aliasMap) {
    delete aliasMap[name];
    saveAliases();
    return true;
  }
  return false;
}

export function listAliases(): string {
  const entries = Object.entries(aliasMap);
  if (entries.length === 0) return "No aliases defined.";
  return entries.map(([k, v]) => `alias ${k}='${v}'`).join("\n");
}

export function resolveAlias(input: string): string {
  const [cmd, ...rest] = input.split(" ");
  const resolved = aliasMap[cmd];
  if (resolved) {
    return rest.length > 0 ? `${resolved} ${rest.join(" ")}` : resolved;
  }
  return input;
}
