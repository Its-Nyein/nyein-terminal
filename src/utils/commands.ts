import { CREDITS, HELP, MAN_PAGES } from "./texts";
import {
  getAbout,
  getGithub,
  getRepos,
  getContacts,
  getExperience,
  loadConfig,
} from "./fetch";
import {
  changeDirectory,
  listDirectory,
  readFile,
  printWorkingDirectory,
  getTree,
  getPathCompletions,
} from "./filesystem";

export async function command(input0: string, input1: string) {
  const result = await (async () => {
    switch (input0) {
      case "help":
        return HELP;
      case "about":
        return await getAbout();
      case "experience":
      case "exp":
        return await getExperience();
      case "github":
      case "neofetch":
      case "fastfetch":
        return await getGithub();
      case "repos":
      case "onefetch":
        return await getRepos();
      case "links":
        return await getContacts();
      case "credits":
        return CREDITS;
      case "cd":
        return changeDirectory(input1.trim() || "~") ?? "";
      case "ls":
        return listDirectory(input1.trim() || undefined);
      case "cat":
        if (!input1.trim()) return "cat: missing file operand";
        return readFile(input1.trim());
      case "pwd":
        return printWorkingDirectory();
      case "tree":
        return getTree(input1.trim() || undefined);
      case "mkdir":
      case "touch":
      case "rm":
      case "rmdir":
      case "cp":
      case "mv":
        return `${input0}: permission denied: read-only file system`;
      case "man": {
        const cmd = input1.trim();
        if (!cmd)
          return "What manual page do you want?\nUsage: man &lt;command&gt;";
        const page = MAN_PAGES[cmd];
        return page || `No manual entry for ${cmd}`;
      }
      case "grep":
      case "which":
      case "find":
        return "Nowhere to search.";
      case "nano":
      case "vi":
      case "vim":
      case "nvim":
      case "hx":
        return "Great editor.";
      case "emacs":
        return "Great mail client";
      case "su":
      case "sudo":
      case "chmod":
        return "With great power comes great responsibility.";
      case "whoami": {
        const config = await loadConfig();
        return config?.username || "user";
      }
      case "exit":
        return "Exit.";
      case "echo": {
        let output = input1.trim();
        // Single quotes: no expansion
        if (output.startsWith("'") && output.endsWith("'")) {
          return output.slice(1, -1);
        }
        // Double quotes: strip quotes but allow expansion
        if (output.startsWith('"') && output.endsWith('"')) {
          output = output.slice(1, -1);
        }
        return `__ENV_EXPAND__${output}`;
      }
      case "":
        return "";
      default:
        return `Unknown command: ${input0}`;
    }
  })();

  return result;
}

const FS_COMMANDS = [
  "cd",
  "ls",
  "cat",
  "rm",
  "mkdir",
  "touch",
  "cp",
  "mv",
  "tree",
];

export function getAllCommands(): string[] {
  return [
    "help",
    "about",
    "experience",
    "exp",
    "github",
    "neofetch",
    "fastfetch",
    "repos",
    "onefetch",
    "links",
    "credits",
    "cd",
    "mkdir",
    "touch",
    "rm",
    "rmdir",
    "cp",
    "mv",
    "ls",
    "cat",
    "tree",
    "man",
    "grep",
    "which",
    "find",
    "pwd",
    "nano",
    "vi",
    "vim",
    "nvim",
    "hx",
    "emacs",
    "su",
    "sudo",
    "chmod",
    "whoami",
    "exit",
    "echo",
    "clear",
    "history",
    "theme",
    "wal",
  ];
}

export function getMatchingCommands(input: string): string[] {
  const trimmedInput = input.trim().toLowerCase();

  if (trimmedInput.length === 0) {
    return [];
  }

  const parts = trimmedInput.split(/\s+/);

  if (parts.length === 1) {
    const commands = getAllCommands();
    return commands.filter((cmd) => cmd.toLowerCase().startsWith(parts[0]));
  }

  // Command already typed — complete file path argument
  const cmd = parts[0];
  const pathFragment = parts.slice(1).join(" ");

  if (FS_COMMANDS.includes(cmd)) {
    const completions = getPathCompletions(pathFragment);
    return completions.map((c) => `${cmd} ${c}`);
  }

  return [];
}

export function autoComplete(input: string) {
  const trimmedInput = input.trim();

  const commands = getAllCommands();

  if (trimmedInput.length > 0) {
    for (const command of commands) {
      if (command.startsWith(trimmedInput)) {
        return command;
      }
    }
  }
  return trimmedInput;
}

export function banner(): string {
  return HELP;
}
