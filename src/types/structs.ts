export interface Config {
  username: string;
  github: string;
  about: About;
  links: Links;
}

export interface About {
  name: string;
  intro: string;
  techStack: string[];
  experience: Experience[];
  education: Education[];
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description?: string[];
}

export interface Education {
  institute: string;
  major: string;
  duration: string;
}
export interface Links {
  github: string;
  email: string;
  linkedin: string;
}

export interface Profile {
  username: string;
  langs: string[];
  info: UserInfo;
  stats: UserStats;
}

export interface UserInfo {
  name?: string;
  bio?: string;
  public_repos: number;
  company?: string;
  location?: string;
  followers: number;
  following: number;
  created_at: string;
}

export interface UserStats {
  stars: number;
  forks: number;
}

export interface ApiResponse {
  response: Repository[];
}

export interface Repos {
  repos: Repository[];
}

export interface Repository {
  author: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
}

export type Theme = "catppuccin" | "nord" | "default" | "tokyonight";
