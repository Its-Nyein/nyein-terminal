import type { About, Profile, Repository, Links } from "../types/structs";

const NEOFETCH = `
   .x+=:.                                     
  z\`    ^%                          .uef^"    
     .   >k                       :d88E       
   .@8Ned8"       u           .   \`888E       
 .@^%8888"     us888u.   .udR88N   888E .z8k  
x88:  \`)8b. .@88 "8888" >888'888k  888E~?888L 
8888N=*8888 9888  9888  9888 'Y"   888E  888E 
 %8"    R88 9888  9888  9888       888E  888E 
  @8Wou 9%  9888  9888  9888       888E  888E 
.888888P\`   9888  9888  ?8888u../  888E  888E 
\`   ^"F     "888*""888"  "8888P'  m888N= 888< 
             ^Y"   ^Y'     "P'     \`Y"   888  
                                        J88"  
                                        @%    
                                      :"      
`;

const BLOCKS =
  '<span class="blocks" style="color:var(--black)">█</span><span class="rd blocks">█</span><span class="grn blocks">█</span><span class="ylw blocks">█</span><span class="blu blocks">█</span><span class="blocks" style="color:var(--orange)">█</span><span class="blocks" style="color:var(--purple)">█</span><span class="blocks">█</span>';

const RUST = '<span style="color:#E43717;">**</span>';
const PYTHON = '<span style="color:#4989BC;">//</span>';

const GO_ASCII = `
MM'"""""\`MM MMP"""""YMM 
M' .mmm. \`M M' .mmm. \`M 
M  MMMMMMMM M  MMMMM  M 
M  MMM   \`M M  MMMMM  M 
M. \`MMM' .M M. \`MMM' .M 
MM.     .MM MMb     dMM 
MMMMMMMMMMM MMMMMMMMMMM 

`;

const TYPESCRIPT_ASCII = `
M""""""""M MP""""""\`MM 
Mmmm  mmmM M  mmmmm..M 
MMMM  MMMM M.      \`YM 
MMMM  MMMM MMMMMMM.  M 
MMMM  MMMM M. .MMM'  M 
MMMM  MMMM Mb.     .dM 
MMMMMMMMMM MMMMMMMMMMM 

`;

const JAVASCRIPT_ASCII = `
MMMMMMMM""M MP""""""\`MM 
MMMMMMMM  M M  mmmmm..M 
MMMMMMMM  M M.      \`YM 
MMMMMMMM  M MMMMMMM.  M 
M. \`MMM' .M M. .MMM'  M 
MM.     .MM Mb.     .dM 
MMMMMMMMMMM MMMMMMMMMMM 

`;

const DEFAULT_ASCII = `
   ╔═══╗
  ║ @ ║
   ╚═╦═╝
     ║
    ╔╩╗
   ╚══╝`;

export function formatAbout(about: About): string {
  const eduString = about.education
    .map((edu) => {
      return `<span class="blu semibold">Institute: </span>${edu.institute}
<span class="blu semibold">Course:</span> ${edu.major}
<span class="blu semibold">Duration:</span> ${edu.duration}`;
    })
    .join("\n");

  const text = `<center class="grn semibold">${about.name.toUpperCase()}</center>
${about.intro}

<u class="rd semibold">Languages</u>

${formatLangs(about.techStack)}

<u class="rd semibold">Education</u>

${eduString}
`;

  return `



<div class="row" style="display: flex; flex-direction: row; align-items: center; justify-content: center;"> 
<div class="about">${text}</div>
</div>
`;
}

export function formatExperience(experience: About["experience"]): string {
  const expString = experience
    .map((exp, index) => {
      const descriptionText =
        exp.description && exp.description.length > 0
          ? `\n<span class="blu semibold">Description:</span> 
${exp.description
  .map((s) => `<span class="blu semibold">*</span> ${s}`)
  .join("\n")}`
          : "";

      const separator =
        index < experience.length - 1
          ? "\n\n<div style='margin: 25px 0; border-top: 2px solid var(--green); opacity: 0.4;'></div>\n\n"
          : "";

      return `<span class="grn semibold" style="font-size: 1.15em; display: block; margin-bottom: 8px;">${exp.title}</span>
<span class="blu semibold">Company:</span> <span style="color: var(--white);">${exp.company}</span>
<span class="blu semibold">Duration:</span> <span style="color: var(--white);">${exp.duration}</span>${descriptionText}${separator}`;
    })
    .join("");

  const text = `<u class="rd semibold" style="font-size: 1.2em;">Experience</u>

${expString}
`;

  return `



<div class="row" style="display: flex; flex-direction: row; align-items: center; justify-content: center;"> 
<div class="about">${text}</div>
</div>
`;
}

export function formatProfile(profile: Profile): string {
  const name = profile.info.name ?? "-";
  const bio = profile.info.bio ?? "-";
  const repos = profile.info.public_repos;
  const stars = profile.stats.stars;
  const forks = profile.stats.forks;
  const company = profile.info.company ?? "-";
  const location = profile.info.location ?? "-";
  const followers = profile.info.followers;
  const following = profile.info.following;
  const createdOn = profile.info.created_at.slice(0, 10);

  const text = `<a href="https://www.github.com/${
    profile.username
  }" style="text-decoration:none" target="_blank"><span class="grn semibold">${
    profile.username
  }</span><span class="grn semibold">@termfolio</span></a>
----------------------
<span class="grn semibold">Name:</span> ${name}
<span class="grn semibold">Bio:</span> ${bio}
<span class="grn semibold">Repos:</span> ${repos}
<span class="grn semibold">Langs:</span> ${formatLangs(profile.langs)}
<span class="grn semibold">Stars:</span> ${stars}
<span class="grn semibold">Forks:</span> ${forks}
<span class="grn semibold">Company:</span> ${company}
<span class="grn semibold">Location:</span> ${location}
<span class="grn semibold">Followers:</span> ${followers}
<span class="grn semibold">Following:</span> ${following}
<span class="grn semibold">Created on:</span> ${createdOn}

${BLOCKS}`;

  return `<div class="row">
<div class="ascii">${NEOFETCH}</div>
<div class="text">${text}</div>
</div>`;
}

export function formatRepos(repos: Repository[]): string {
  const res = repos.map((repo) => {
    const text = `<a href="https://github.com/${repo.author}/${repo.name}" target="_blank" class="blu semibold">${repo.name}</a>
  
  <span class="rd semibold">Description:</span> ${repo.description}
  <span class="rd semibold">Language:</span> <span class="blu">${repo.language}</span>
  <span class="rd semibold">Stars:</span> <span class="ylw">${repo.stars}</span>
  <span class="rd semibold">Forks:</span> <span class="ylw">${repo.forks}</span>
  
          `;

    return `<div class="row">
  <div class="ascii">${langIcon(repo.language)}</div>
  <div class="text">${text}</div>
  </div>`;
  });

  return res.join("\n");
}

export function formatLinks(links: Links): string {
  let result = `<div class="links-container">
    <div class="link-item">
      <a href="https://github.com/${links.github}" target="_blank" class="semibold" style="color:var(--purple); text-decoration: none;">Github</a>:
      <span>github.com/${links.github}</span>
    </div>`;

  if (links.email) {
    result += `
    <div class="link-item">
      <a href="mailto:${links.email}" target="_blank" class="semibold" style="color:var(--orange); text-decoration: none;">Email</a>:
      <span>${links.email}</span>
    </div>`;
  }

  if (links.linkedin) {
    result += `
    <div class="link-item">
      <a href="https://www.linkedin.com/${links.linkedin}" target="_blank" class="semibold" style="color:var(--dblue); text-decoration: none;">LinkedIn</a>:
      <span>linkedin.com/${links.linkedin}</span>
    </div>`;
  }

  result += `</div>`;
  return result;
}

export function formatLangs(langs: string[]): string {
  const colorMap: Record<string, string> = {
    HTML: "orange",
    CSS: "blue",
    JavaScript: "yellow",
    TypeScript: "blue",
    Go: "blue",
    Bash: "dgreen",

    // Frontend Libraries & Frameworks
    "React.js": "blue",
    React: "blue",
    Angular: "red",
    "Vue.js": "green",
    Vue: "green",
    "Next.js": "dblue",
    Next: "dblue",
    Vite: "purple",
    "Shadcn UI": "blue",
    "MUI Material": "blue",
    Redux: "purple",
    Zod: "dblue",
    Zustand: "orange",
    "Tanstack Query": "blue",
    "TanStack Query": "blue",
    "Tanstack Table": "dblue",
    "TanStack Table": "dblue",

    // Backend Libraries & Frameworks
    "Node.js": "green",
    Express: "yellow",
    NestJS: "red",
    Nest: "red",

    // Databases & ORMs
    MySQL: "blue",
    MSSQL: "dblue",
    PrismaORM: "dblue",
    Prisma: "dblue",
    SQLite: "blue",
    PostgreSQL: "dblue",
    Firebase: "orange",
    MongoDB: "dgreen",

    // Version Control & Operating Systems
    Git: "orange",
    Linux: "yellow",
  };

  const formattedLangs = langs.map((lang) => {
    const color = colorMap[lang];
    if (color) {
      return `<span style="color:var(--${color});">${lang}</span>`;
    }
    return `<span>${lang}</span>`;
  });

  return formattedLangs.join(" ");
}

function langIcon(lang: string): string {
  switch (lang) {
    case "Rust":
      return RUST;
    case "Python":
    case "Jupyter Notebook":
      return PYTHON;
    case "Go":
      return GO_ASCII;
    case "TypeScript":
      return TYPESCRIPT_ASCII;
    case "JavaScript":
      return JAVASCRIPT_ASCII;
    default:
      return DEFAULT_ASCII;
  }
}
