import { CREDITS, HELP } from "./texts";
import {
  getAbout,
  getGithub,
  getRepos,
  getContacts,
  getExperience,
  loadConfig,
} from "./fetch";

export async function command(input0: string, input1: string) {
  const result = await (async () => {
    switch (input0) {
      case "help":
        return HELP;
      case "termfolio":
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
        return "Nowhere to go.";
      case "mkdir":
      case "touch":
        return "Nowhere to create.";
      case "rm":
      case "rmdir":
        return "Nothing to destroy.";
      case "cp":
        return "Nothing to duplicate.";
      case "mv":
        return "Nowhere to move.";
      case "ls":
      case "cat":
        return "Nothing to see.";
      case "grep":
      case "which":
      case "find":
        return "Nowhere to search.";
      case "pwd":
        return "You are here.";
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
        if (
          (output.startsWith("'") && output.endsWith("'")) ||
          (output.startsWith('"') && output.endsWith('"'))
        ) {
          output = output.slice(1, -1);
        }
        return output;
      }
      case "":
        return "";
      default:
        return `Unknown command: ${input0}`;
    }
  })();

  return result;
}

export function autoComplete(input: string) {
  const trimmedInput = input.trim();

  const commands = ["help"];

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
