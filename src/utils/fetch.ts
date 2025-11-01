import type {
  Config,
  UserInfo,
  UserStats,
  Profile,
  Repository,
} from "../types/structs";
import { formatAbout } from "../utils/format";
import { formatProfile } from "../utils/format";
import { formatRepos } from "../utils/format";
import { formatLinks } from "../utils/format";
import { READ_JSON_ERROR, FETCH_GITHUB_ERROR } from "./texts";

let configCache: Config | null = null;
let promptCache: string | null = null;
let githubCache: string | null = null;
let reposCache: string | null = null;
let contactsCache: string | null = null;

async function loadConfig(): Promise<Config | null> {
  if (configCache !== null) {
    return configCache;
  }

  try {
    const response = await fetch("/configs/config.json");
    if (!response.ok) {
      return null;
    }

    const config: Config = await response.json();
    configCache = config;
    return config;
  } catch {
    return null;
  }
}

export async function getPrompt(): Promise<string> {
  if (promptCache !== null) {
    return promptCache;
  }

  const config = await loadConfig();
  if (config) {
    promptCache = `${config.username}@nyein-terminal~$ `;
  } else {
    promptCache = "user@nyein-terminal~$ ";
  }

  return promptCache;
}

export async function getAbout(): Promise<string> {
  const config = await loadConfig();
  if (config) {
    return formatAbout(config.about);
  }
  return READ_JSON_ERROR;
}

export async function getGithub(): Promise<string> {
  if (githubCache !== null) {
    return githubCache;
  }

  const config = await loadConfig();
  if (!config) {
    return READ_JSON_ERROR;
  }

  try {
    const infoUrl = `https://api.github.com/users/${config.github}`;
    const statsUrl = `https://api.github-star-counter.workers.dev/user/${config.github}`;

    const [infoResponse, statsResponse] = await Promise.all([
      fetch(infoUrl),
      fetch(statsUrl),
    ]);

    if (!infoResponse.ok || !statsResponse.ok) {
      return FETCH_GITHUB_ERROR;
    }

    const info = (await infoResponse.json()) as UserInfo;
    const stats = (await statsResponse.json()) as UserStats;

    const profile: Profile = {
      username: config.github,
      langs: config.about.techStack,
      info,
      stats,
    };

    githubCache = formatProfile(profile);
    return githubCache as string;
  } catch {
    return FETCH_GITHUB_ERROR;
  }
}

export async function getRepos(): Promise<string> {
  if (reposCache !== null) {
    return reposCache;
  }

  const config = await loadConfig();
  if (!config) {
    return READ_JSON_ERROR;
  }

  try {
    const reposUrl = `https://pinned.berrysauce.dev/get/${config.github}`;
    const response = await fetch(reposUrl);

    if (!response.ok) {
      return FETCH_GITHUB_ERROR;
    }

    const repos = (await response.json()) as Repository[];
    reposCache = formatRepos(repos);
    return reposCache as string;
  } catch {
    return FETCH_GITHUB_ERROR;
  }
}

export async function getContacts(): Promise<string> {
  if (contactsCache !== null) {
    return contactsCache;
  }

  const config = await loadConfig();
  if (!config) {
    return READ_JSON_ERROR;
  }

  contactsCache = formatLinks(config.links) as string;
  return contactsCache as string;
}
