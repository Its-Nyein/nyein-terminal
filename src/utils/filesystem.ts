import type { Config, FSNode } from "../types/structs";

let root: FSNode = { name: "~", type: "directory", children: [] };
let activeTabId: string = "tab-0";
const tabCwdMap: Map<string, string[]> = new Map([["tab-0", ["~"]]]);

function getCwdSegments(): string[] {
  return tabCwdMap.get(activeTabId) || ["~"];
}

function setCwdSegments(segments: string[]): void {
  tabCwdMap.set(activeTabId, segments);
}

export function setActiveTab(tabId: string): void {
  activeTabId = tabId;
  if (!tabCwdMap.has(tabId)) {
    tabCwdMap.set(tabId, ["~"]);
  }
}

export function removeTab(tabId: string): void {
  tabCwdMap.delete(tabId);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(text: string): string {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function initFilesystem(config: Config): void {
  root = {
    name: "~",
    type: "directory",
    children: [
      {
        name: "about.txt",
        type: "file",
        content: [`Name: ${config.about.name}`, "", config.about.intro].join(
          "\n",
        ),
      },
      {
        name: "skills.txt",
        type: "file",
        content: config.about.techStack.join("\n"),
      },
      {
        name: "links.txt",
        type: "file",
        content: [
          `GitHub:   https://github.com/${config.links.github}`,
          `Email:    ${config.links.email}`,
          `LinkedIn: https://linkedin.com/${config.links.linkedin}`,
        ].join("\n"),
      },
      {
        name: "experience",
        type: "directory",
        children: config.about.experience.map((exp) => ({
          name: slugify(`${exp.title}-${exp.company}`) + ".txt",
          type: "file" as const,
          content: [
            `Title:    ${exp.title}`,
            `Company:  ${exp.company}`,
            `Duration: ${exp.duration}`,
            ...(exp.description
              ? ["", ...exp.description.map((d) => `  - ${d}`)]
              : []),
          ].join("\n"),
        })),
      },
      {
        name: "education",
        type: "directory",
        children: config.about.education.map((edu) => ({
          name: slugify(edu.institute) + ".txt",
          type: "file" as const,
          content: [
            `Institute: ${edu.institute}`,
            `Major:     ${edu.major}`,
            `Duration:  ${edu.duration}`,
          ].join("\n"),
        })),
      },
      {
        name: "projects",
        type: "directory",
        children: [],
      },
    ],
  };
}

export function getCwd(): string {
  return getCwdSegments().join("/");
}

function resolveSegments(pathStr: string): string[] | null {
  let segments: string[];

  if (pathStr === "~" || pathStr === "/" || pathStr === "") {
    return ["~"];
  }

  if (pathStr.startsWith("~/")) {
    segments = ["~", ...pathStr.slice(2).split("/").filter(Boolean)];
  } else if (pathStr.startsWith("/")) {
    segments = ["~", ...pathStr.slice(1).split("/").filter(Boolean)];
  } else {
    segments = [...getCwdSegments(), ...pathStr.split("/").filter(Boolean)];
  }

  // Resolve . and ..
  const resolved: string[] = ["~"];
  for (let i = 1; i < segments.length; i++) {
    const seg = segments[i];
    if (seg === ".") continue;
    if (seg === "..") {
      if (resolved.length > 1) resolved.pop();
      continue;
    }
    resolved.push(seg);
  }

  return resolved;
}

function getNodeAtSegments(segments: string[]): FSNode | null {
  let node = root;
  for (let i = 1; i < segments.length; i++) {
    if (node.type !== "directory" || !node.children) return null;
    const child = node.children.find((c) => c.name === segments[i]);
    if (!child) return null;
    node = child;
  }
  return node;
}

export function resolvePath(pathStr: string): FSNode | null {
  const segments = resolveSegments(pathStr);
  if (!segments) return null;
  return getNodeAtSegments(segments);
}

export function changeDirectory(pathStr: string): string | null {
  const segments = resolveSegments(pathStr);
  if (!segments) return `cd: no such file or directory: ${pathStr}`;

  const node = getNodeAtSegments(segments);
  if (!node) return `cd: no such file or directory: ${pathStr}`;
  if (node.type !== "directory") return `cd: not a directory: ${pathStr}`;

  setCwdSegments(segments);
  return null;
}

export function listDirectory(pathStr?: string): string {
  const node = pathStr
    ? resolvePath(pathStr)
    : getNodeAtSegments(getCwdSegments());

  if (!node) return `ls: cannot access '${pathStr}': No such file or directory`;
  if (node.type === "file") return node.name;
  if (!node.children || node.children.length === 0) return "";

  return node.children
    .map((child) => {
      if (child.type === "directory") {
        return `<span class="blu semibold">${escapeHtml(child.name)}/</span>`;
      }
      return escapeHtml(child.name);
    })
    .join("  ");
}

function autoLinkUrls(text: string): string {
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" class="blu semibold">$1</a>',
  );
}

export function readFile(pathStr: string): string {
  const node = resolvePath(pathStr);
  if (!node) return `cat: ${pathStr}: No such file or directory`;
  if (node.type === "directory") return `cat: ${pathStr}: Is a directory`;
  return autoLinkUrls(escapeHtml(node.content || ""));
}

export function printWorkingDirectory(): string {
  return getCwd();
}

export function getTree(pathStr?: string, prefix?: string): string {
  const node = pathStr
    ? resolvePath(pathStr)
    : getNodeAtSegments(getCwdSegments());
  if (!node) return `tree: '${pathStr}': No such file or directory`;
  if (node.type === "file") return node.name;
  if (!node.children || node.children.length === 0)
    return `${node.name}\n\n0 directories, 0 files`;

  const lines: string[] = [];
  const p = prefix || "";
  let dirs = 0;
  let files = 0;

  function walk(children: FSNode[], pre: string) {
    children.forEach((child, i) => {
      const isLast = i === children.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const name =
        child.type === "directory"
          ? `<span class="blu semibold">${escapeHtml(child.name)}/</span>`
          : escapeHtml(child.name);
      lines.push(`${pre}${connector}${name}`);

      if (child.type === "directory") {
        dirs++;
        if (child.children && child.children.length > 0) {
          walk(child.children, pre + (isLast ? "    " : "│   "));
        }
      } else {
        files++;
      }
    });
  }

  lines.push(node.name === "~" ? "." : escapeHtml(node.name));
  walk(node.children, p);
  lines.push(`\n${dirs} directories, ${files} files`);

  return `<span class="ascii">${lines.join("\n")}</span>`;
}

export function getPathCompletions(partial: string): string[] {
  // Split into directory part and name prefix
  const lastSlash = partial.lastIndexOf("/");
  let dirPath: string;
  let namePrefix: string;

  if (lastSlash === -1) {
    dirPath = "";
    namePrefix = partial;
  } else {
    dirPath = partial.slice(0, lastSlash) || "/";
    namePrefix = partial.slice(lastSlash + 1);
  }

  const dirNode =
    dirPath === "" ? getNodeAtSegments(getCwdSegments()) : resolvePath(dirPath);

  if (!dirNode || dirNode.type !== "directory" || !dirNode.children) return [];

  const prefix =
    dirPath && dirPath !== "" && lastSlash !== -1 ? dirPath + "/" : "";

  return dirNode.children
    .filter((child) =>
      child.name.toLowerCase().startsWith(namePrefix.toLowerCase()),
    )
    .map((child) =>
      child.type === "directory"
        ? `${prefix}${child.name}/`
        : `${prefix}${child.name}`,
    );
}
